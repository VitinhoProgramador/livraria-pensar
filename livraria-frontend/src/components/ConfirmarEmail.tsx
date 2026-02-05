import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { confirmarEmail } from "../services/authService";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";

export function ConfirmarEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    let active = true; // Flag para controlar se o componente ainda está montado
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMensagem("Token de ativação não encontrado.");
      return;
    }

    // Chamamos a API sem medo, pois o C# agora aguenta chamadas repetidas
    confirmarEmail(token)
  .then((res) => {
    if (!active) return;

    if (res.status) {
      setStatus("success");
      setMensagem(res.mensagem);
    } else {
      // Só muda para erro se já não estiver em "success"
      setStatus(prev => prev === "success" ? "success" : "error");
      setMensagem(res.mensagem);
    }
  })
  .catch(() => {
    if (!active) return;
    // Se der erro de rede ou 400, mas já estiver verde, mantém o verde
    setStatus(prev => prev === "success" ? "success" : "error");
    if (status !== "success") setMensagem("Este link expirou ou já foi utilizado.");
  });

    return () => {
      active = false; // "Desliga" o processamento se o usuário sair da tela
    };
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl text-center shadow-2xl">
        
        {status === "loading" && (
          <div className="space-y-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto" />
            <h2 className="text-xl font-semibold text-white">Validando seu e-mail...</h2>
            <p className="text-slate-400 text-sm">Aguarde um momento enquanto ativamos sua conta.</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6 animate-in zoom-in duration-300">
            <div className="bg-emerald-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-white">Conta Ativada!</h2>
            <p className="text-slate-400">{mensagem}</p>
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20"
            >
              Ir para o Login
              <ArrowRight size={18} />
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6 animate-in zoom-in duration-300">
            <div className="bg-red-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white">Ops! Algo deu errado</h2>
            <p className="text-slate-400">{mensagem}</p>
            <Link to="/register" className="text-blue-400 hover:underline text-sm font-medium">
              Tentar registrar novamente
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}