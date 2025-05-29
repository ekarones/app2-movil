import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  userId: string | null;
  setUserId: (userId: string | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  setUserId: () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserIdState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const setUserId = async (id: string | null) => {
    setUserIdState(id);
    if (id) {
      await AsyncStorage.setItem("userId", id);
    } else {
      await AsyncStorage.removeItem("userId");
    }
  };

  // Restaurar sesión en el inicio
  useEffect(() => {
    const loadUserId = async () => {
      const storedId = await AsyncStorage.getItem("userId");
      if (storedId) {
        setUserIdState(storedId);
      }
      setLoading(false);
    };
    loadUserId();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, setUserId, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
