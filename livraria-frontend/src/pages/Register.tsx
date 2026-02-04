import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const resposta = await register(usuario, email, senha);
      setMsg(resposta.mensagem);
      setTimeout(() => navigate("/login"), 3000);
    } catch {
      setMsg("Erro ao registrar");
    }
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input placeholder="Usuário" onChange={e => setUsuario(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />

      {msg && <p>{msg}</p>}

      <button>Criar Conta</button>
    </form>
  );
}
