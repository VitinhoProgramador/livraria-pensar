import { api } from "../api/axios";

// Interface para a resposta de Login
export interface LoginResponse {
  dados: string;      // Geralmente o Token JWT
  mensagem: string;   // Mensagem de sucesso/erro ou Refresh Token
  status: boolean;
}

// Interface para a resposta de Registro (baseada no que as APIs costumam retornar)
export interface RegisterResponse {
  status: boolean;
  mensagem: string;
  dados?: any;
}

export async function login(email: string, senha: string) {
  const response = await api.post<LoginResponse>("/Auth/login", {
    email,
    senha,
  });

  return response.data;
}

export async function register(
  usuario: string, 
  email: string, 
  senha: string, 
  confirmaSenha: string // Ajustado para bater com o JSON da API
) {
  const response = await api.post<RegisterResponse>("/Auth/register", {
    usuario,
    email,
    senha,
    confirmaSenha, // Enviando a chave exatamente como a API espera
  });

  return response.data;
}

export async function confirmarEmail(token: string) {
  const response = await api.get<RegisterResponse>(`/Auth/confirmar-email?token=${token}`);
  return response.data;
}