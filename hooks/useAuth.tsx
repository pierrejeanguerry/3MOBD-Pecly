import { useState, createContext, useContext, ReactNode } from "react";
import firestore from "@react-native-firebase/firestore";
import bcrypt from "react-native-bcrypt";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
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

  const register = async (email: string, password: string): Promise<void> => {
    console.log("register");

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
        console.log("Mot de passe haché :", hash);
        hashedPassword = hash;
        firestore()
          .collection("Users")
          .add({ email: email, password: hashedPassword });
        setUser({ email });
      })
      .catch((error) => {
        console.error("Erreur lors du hachage :", error);
      });
  };

  const login = async (email: string, password: string): Promise<void> => {
    const querySnapshot = await firestore()
      .collection("Users")
      .where("email", "==", email)
      .get();
    if (querySnapshot.empty) {
      throw new Error("Utilisateur non trouvé");
    }

    const userData = querySnapshot.docs[0].data();
    comparePassword(password, userData.passworm)
      .then((isMatch) => {
        if (isMatch) {
          console.log("Mot de passe correct !");
          setUser({ email });
        } else {
          console.log("Mot de passe incorrect !");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la comparaison :", error);
      });
  };

  const logout = (): void => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
