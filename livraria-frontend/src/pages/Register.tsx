import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, UserPlus, CheckCircle2, AlertCircle, ArrowRight,ShieldCheck } from "lucide-react";

export function Register() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    try {
      const resposta = await register(usuario, email, senha,confirmaSenha);
      setStatus("success");
      setMsg(resposta.mensagem || "Conta criada com sucesso!");
      // Redireciona após 2 segundos para o usuário ver a mensagem de sucesso
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setStatus("error");
      setMsg("Erro ao registrar. Tente um e-mail diferente.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      {/* Luzes de fundo (Glow) */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md z-10">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
          
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl mb-4">
              <UserPlus className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Criar conta</h1>
            <p className="text-slate-400 mt-2">Junte-se à nossa comunidade de leitores</p>
          </div>

          {/* Mensagens de Feedback */}
          {msg && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm animate-in fade-in zoom-in duration-300 ${
              status === "success" 
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}>
              {status === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <p>{msg}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Nome de Usuário */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Nome de usuário</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  className="w-full bg-slate-950/50 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">E-mail</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="exemplo@email.com"
                  className="w-full bg-slate-950/50 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="password"
                  required
                  placeholder="Crie uma senha forte"
                  className="w-full bg-slate-950/50 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
            </div>
            {/* Confirma Senha */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 ml-1">Confirmar Senha</label>
              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="password"
                  required
                  className="w-full bg-slate-950/50 border border-slate-700 text-white pl-12 pr-4 py-2.5 rounded-xl outline-none focus:border-indigo-500 transition-all"
                  onChange={(e) => setConfirmaSenha(e.target.value)}
                />
              </div>
            </div>

            {/* Botão Registrar */}
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-900/20 transition-all flex items-center justify-center gap-2 group mt-2"
            >
              {status === "loading" ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Criar conta agora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Link para Login */}
          <p className="text-center text-slate-400 text-sm mt-8">
            Já possui uma conta?{" "}
            <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}