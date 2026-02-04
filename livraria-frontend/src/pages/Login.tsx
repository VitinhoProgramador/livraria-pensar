import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    try {
      await login(email, senha);
      navigate("/");
    } catch (err: any) {
      setErro(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />

      {erro && <p className="text-red-500">{erro}</p>}

      <button>Entrar</button>
    </form>
  );
}
