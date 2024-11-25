import Cookies from "js-cookie";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Define the types for the context
interface AuthContextType {
  authToken: string | null;
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create context with default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provide context in your app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    setAuthToken(token ?? "");
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};