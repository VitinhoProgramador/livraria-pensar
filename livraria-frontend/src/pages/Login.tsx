import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn, AlertCircle, ArrowRight } from "lucide-react";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      await login(email, senha);
      navigate("/");
    } catch (err: any) {
      setErro("E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md z-10">
        {/* Card de Login */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
          
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-blue-500/10 rounded-2xl mb-4">
              <LogIn className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Bem-vindo de volta</h1>
            <p className="text-slate-400 mt-2">Acesse sua conta na Livraria</p>
          </div>

          {/* Mensagem de Erro */}
          {erro && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-in fade-in zoom-in duration-200">
              <AlertCircle size={18} />
              <p>{erro}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo de Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">E-mail</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="exemplo@email.com"
                  className="w-full bg-slate-950/50 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Campo de Senha */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-300">Senha</label>
                <a href="#" className="text-xs text-blue-400 hover:underline">Esqueceu a senha?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Entrar na conta
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer do Card */}
          <p className="text-center text-slate-400 text-sm mt-8">
            Não tem uma conta?{" "}
            <Link to="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
              Cadastre-se grátis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}