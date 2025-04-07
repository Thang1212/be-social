import { secureGet } from "@/utils/storage";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  token: string;
  isLoading: boolean;
  setToken: (token: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}>({ token: "", isLoading: true, setToken: () => {}, setIsLoading: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AuthContext.Provider value={{ token, isLoading, setToken, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const { token, isLoading, setToken, setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await secureGet("token");
      setToken(token || "");
      setIsLoading(false);
    };
    fetchToken();
  }, []);

  return { token, isLoggedIn: !!token, isLoading };
}
