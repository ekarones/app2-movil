import React, { createContext, useState, useContext } from "react";

interface AuthContextType {
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  setUserId: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  return <AuthContext.Provider value={{ userId, setUserId }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
