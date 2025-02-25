import {
  useState,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import firestore from "@react-native-firebase/firestore";
import bcrypt from "react-native-bcrypt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types/user";
import {
  AuthError,
  ContextError,
  ERROR_MESSAGES,
  ValidationError,
} from "@/utils/errors";

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  saveUser: (user: User) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    gender: string,
    lastName: string,
    firstName: string,
    phone: string
  ) => Promise<void>;
  registerCaregiver: (
    email: string,
    password: string,
    lastName: string,
    firstName: string,
    phone: string,
    licenseNumber: string,
    gender: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  checkIsLogged: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new ContextError(ERROR_MESSAGES.CONTEXT_PROVIDER_ERROR);
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const saltRounds = 10;
  // bcrypt.setRandomFallback(require("crypto").randomBytes);

  const hashPassword = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else if (hash) {
          resolve(hash);
        }
      });
    });
  };

  const comparePassword = (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  const register = async (
    email: string,
    password: string,
    gender: string,
    lastName: string,
    firstName: string,
    phone: string
  ): Promise<void> => {
    if (!password || !email || !gender || !lastName || !firstName || !phone)
      throw new ValidationError(ERROR_MESSAGES.EMPTY_FIELDS);
    if (password.length < 8)
      throw new ValidationError(ERROR_MESSAGES.PASSWORD_TOO_SHORT);

    const querySnapshot = await firestore()
      .collection("Users")
      .where("email", "==", email)
      .get();
    if (!querySnapshot.empty)
      throw new ValidationError(ERROR_MESSAGES.USER_ALREADY_EXISTS);

    try {
      const hash = await hashPassword(password);
      const userRef = await firestore()
        .collection("Users")
        .add({
          email,
          password: hash,
          isCaregiver: false,
          firstname: firstName,
          lastname: lastName,
          contact: { phone: phone },
          gender: gender,
        });
      await saveUser({
        id: userRef.id,
        email,
        password: hash,
        isCaregiver: false,
        firstname: firstName,
        lastname: lastName,
        contact: { phone: phone },
        gender: gender,
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  const registerCaregiver = async (
    email: string,
    password: string,
    lastName: string,
    firstName: string,
    phone: string,
    licenseNumber: string,
    gender: string
  ): Promise<void> => {
    if (
      !password ||
      !email ||
      !lastName ||
      !firstName ||
      !phone ||
      !licenseNumber
    )
      throw new ValidationError(ERROR_MESSAGES.EMPTY_FIELDS);
    if (password.length < 8)
      throw new ValidationError(ERROR_MESSAGES.PASSWORD_TOO_SHORT);

    const querySnapshot = await firestore()
      .collection("Users")
      .where("email", "==", email)
      .get();
    if (!querySnapshot.empty)
      throw new ValidationError(ERROR_MESSAGES.USER_ALREADY_EXISTS);

    try {
      const hash = await hashPassword(password);
      const userRef = await firestore().collection("Users").add({
        email,
        password: hash,
        isCaregiver: true,
        lastname: lastName,
        firstname: firstName,
        contact: { phone },
        caregiverDetails: { licenseNumber },
      });

      await saveUser({
        id: userRef.id,
        email: email,
        password: hash,
        isCaregiver: true,
        lastname: lastName,
        firstname: firstName,
        contact: { phone },
        caregiverDetails: { licenseNumber },
        gender: gender,
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const querySnapshot = await firestore()
      .collection("Users")
      .where("email", "==", email)
      .get();
    if (querySnapshot.empty) {
      throw new AuthError(ERROR_MESSAGES.INCORRECT_PASSWORD);
    }

    let userData: User = querySnapshot.docs[0].data() as User;
    userData.id = querySnapshot.docs[0].ref.id;

    if (await comparePassword(password, userData.password)) {
      await saveUser(userData);
      return true;
    } else throw new AuthError(ERROR_MESSAGES.INCORRECT_PASSWORD);
  };

  const saveUser = async (user: User): Promise<boolean> => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return true;
    } catch (error) {
      console.error("Erreur lors de l’enregistrement", error);
      throw new Error(("Erreur en enregistrant : " + error) as any);
    }
  };

  const checkIsLogged = async (): Promise<boolean> => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        setUser(JSON.parse(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erreur lors de la récupération", error);
      return false;
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      setUser(null);
      await AsyncStorage.removeItem("user");
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        registerCaregiver,
        login,
        logout,
        checkIsLogged,
        setUser,
        saveUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
