import { api } from "../api/axios";

export interface LoginResponse {
  dados: string;      // JWT
  mensagem: string;   // Refresh Token
  status: boolean;
}

export async function login(email: string, senha: string) {
  const response = await api.post<LoginResponse>("/Auth/login", {
    email,
    senha,
  });

  return response.data;
}

export async function register(usuario: string, email: string, senha: string) {
  const response = await api.post("/Auth/register", {
    usuario,
    email,
    senha,
  });

  return response.data;
}
