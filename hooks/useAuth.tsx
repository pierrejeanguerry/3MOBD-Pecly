import { useState, createContext, useContext, ReactNode } from "react";
import firestore from "@react-native-firebase/firestore";
import bcrypt from "react-native-bcrypt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import nativeRNDatePicker from "react-native-date-picker/src/fabric/NativeRNDatePicker";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  register: (email: string, password: string, gender: string, lastName: string, firstName: string, date: Date, phone: string ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  CheckIsLogged: () => void;
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

  const register = async (email: string, password: string, gender: string, lastName: string, firstName: string, date : Date, phone: string): Promise<void> => {
    if (!password || !email || !gender || !lastName || !firstName || !date || !phone) throw new Error("Something is empty");
    if (password.length < 8) throw new Error("Password too small !");

    const querySnapshot = await firestore()
      .collection("Users")
      .where("email", "==", email)
      .get();
    if (!querySnapshot.empty) {
      throw new Error("L'utilisateur existe déjà");
    }

    let hashedPassword = "";
    hashPassword(password)
      .then((hash) => {
        hashedPassword = hash;
        firestore()
          .collection("Users")
          .add({ email: email, password: hashedPassword, gender: gender, lastName: lastName, firstName: firstName, date: date, phone: phone });
      })
      .catch((error) => {
        console.error("Erreur lors du hachage :", error);
      });
    saveUser(email).catch((e) => {
      throw e;
    });
  };

  const login = async (email: string, password: string): Promise<void> => {
    if (!password || !email) throw new Error("Email or Passord empty");
    if (password.length < 8) throw new Error("Password too small !");

    const querySnapshot = await firestore()
      .collection("Users")
      .where("email", "==", email)
      .get();
    if (querySnapshot.empty) {
      throw new Error("Utilisateur non trouvé");
    }

    const userData = querySnapshot.docs[0].data();
    comparePassword(password, userData.password)
      .then((isMatch) => {
        if (isMatch) {
          saveUser(email).catch((e) => {
            throw e;
          });
        } else {
          throw new Error("Wromg password");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la comparaison :", error);
      });
  };

  const saveUser = async (email: string) => {
    try {
      await AsyncStorage.setItem("user", email);
      setUser({ email: email });
    } catch (error) {
      console.error("Erreur lors de l’enregistrement", error);
    }
  };

  const CheckIsLogged = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) setUser({ email: value });
    } catch (error) {
      console.error("Erreur lors de la récupération", error);
    }
  };

  const logout = (): void => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, CheckIsLogged }}
    >
      {children}
    </AuthContext.Provider>
  );
};
