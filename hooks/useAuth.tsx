import { useState, createContext, useContext, ReactNode } from "react";
import firestore from "@react-native-firebase/firestore";
import bcrypt from "react-native-bcrypt";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  address?: {
    city?: string;
    country?: string;
    postalCode?: string;
    street?: string;
  };
  caregiverDetails?: {
    instruction?: string;
    licenseNumber?: string;
    motives?: string[];
    paymentMeans?: {
      card: boolean;
      cash: boolean;
      check: boolean;
    };
    presentation?: string;
    price?: {
      convention?: number;
      prices?: {
        price?: number;
        title?: string;
      }[];
      thirdParty?: string;
      vitalCard?: boolean;
    };
    speciality?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
  };
  email: string;
  isCaregiver: boolean;
  lastname?: string;
  firstname?: string;
  password: string;
  gender: string;
}

interface AuthContextType {
  user: User | null;
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
      gender: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  checkIsLogged: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
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
    if (
      !password ||
      !email ||
      !gender ||
      !lastName ||
      !firstName ||
      !phone
    )
      throw new Error("Something is empty");
    if (password.length < 8) throw new Error("Password too small !");

    const querySnapshot = await firestore()
      .collection("Users")
      .where("email", "==", email)
      .get();
    if (!querySnapshot.empty) throw new Error("L'utilisateur existe déjà");

    try {
      const hash = await hashPassword(password);
      const userRef = await firestore()
        .collection("Users")
        .add({ email, password: hash, isCaregiver: false, firstname : firstName, lastname : lastName, phone : phone, gender: gender });
      await saveUser({ id: userRef.id, email, password: hash, isCaregiver: false, firstname : firstName, lastname : lastName, contact : {phone}, gender: gender });
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
      gender: string,
  ): Promise<void> => {
    if (
        !password ||
        !email ||
        !lastName ||
        !firstName ||
        !phone ||
        !licenseNumber
    )
      throw new Error("Something is empty");
    if (password.length < 8) throw new Error("Password too small !");

    const querySnapshot = await firestore()
        .collection("Users")
        .where("email", "==", email)
        .get();
    if (!querySnapshot.empty) throw new Error("L'utilisateur existe déjà");

    try {
      const hash = await hashPassword(password);
      const userRef = await firestore()
          .collection("Users")
          .add({
            email,
            password: hash,
            isCaregiver: true,
            lastname: lastName,
            firstname: firstName,
            contact: {phone},
            caregiverDetails: {licenseNumber}
          });

      await saveUser({
        id: userRef.id,
        email: email,
        password: hash,
        isCaregiver: true,
        lastname: lastName,
        firstname: firstName,
        contact: {phone},
        caregiverDetails: {licenseNumber},
        gender: gender,
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!password || !email) throw new Error("Email or Passord empty");
    if (password.length < 8) throw new Error("Password too small !");

    const querySnapshot = await firestore()
      .collection("Users")
      .where("email", "==", email)
      .get();
    if (querySnapshot.empty) {
      throw new Error("Utilisateur non trouvé");
    }

    let userData: User = querySnapshot.docs[0].data() as User;
    userData.id = querySnapshot.docs[0].ref.id;

    if (await comparePassword(password, userData.password)){
      await saveUser(userData);
      return true;
    }else return false;
  };

  const saveUser = async (user: User): Promise<boolean> => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      console.log("user = ", user);
      setUser(user);
      return true;
    } catch (error) {
      console.error("Erreur lors de l’enregistrement", error);
      return false;
    }
  };

  const checkIsLogged = async ():Promise<boolean> => {
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
      await AsyncStorage.removeItem("user");
      setUser(null);
      return true;
    } catch (error) {
      return false;
    }

  };

  return (
    <AuthContext.Provider
      value={{ user, register, registerCaregiver, login, logout, checkIsLogged }}
    >
      {children}
    </AuthContext.Provider>
  );
};
