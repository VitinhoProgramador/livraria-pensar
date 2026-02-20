import { createContext, useContext, useEffect, useState } from "react";
import { login as loginService } from "../services/authService";

interface User {
  email: string;
  username: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // 🔄 recuperar sessão ao recarregar
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));

      setUser({
        email: payload.Email,
        username: payload.Username,
      });
    }
  setLoading(false); // <--- Terminou de checar, libera o app
  }, []);

  async function login(email: string, senha: string) {
    const response = await loginService(email, senha);

    if (!response.status) {
      throw new Error(response.mensagem);
    }

    localStorage.setItem("token", response.dados);
    localStorage.setItem("refreshToken", response.mensagem);

    const payload = JSON.parse(atob(response.dados.split(".")[1]));

    setUser({
      email: payload.Email,
      username: payload.Nome,
    });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated,loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
