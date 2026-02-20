import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { 
  ArrowLeft, 
  ShoppingCart, 
  CheckCircle, 
  XCircle, 
  BookOpen, 
  Info
} from "lucide-react";
import type { Livro } from "../types/Livro";
import { api } from "../api/axios"; 

export function DetalhesLivro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { adicionarLivro } = useCart();
  
  const [livro, setLivro] = useState<Livro | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

useEffect(() => {
  async function carregarLivro() {
    try {
      setLoading(true);
      // Ajustado para o seu endpoint específico do C# / .NET
      const response = await api.get(`/Livro/BuscarLivroPorId/${id}`);
      
      // Como seu backend retorna um ResponseModel, precisamos acessar o .dados (ou .data dependendo do seu modelo)
      // Se o seu ResponseModel tiver uma propriedade 'dados' com o livro:
      setLivro(response.data.dados); 
      
    } catch (err) {
      console.error("Erro ao buscar livro:", err);
      setErro(true);
    } finally {
      setLoading(false);
    }
  }

  if (id) carregarLivro();
}, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (erro || !livro) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <XCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-800">Livro não encontrado</h2>
        <button onClick={() => navigate("/")} className="mt-4 text-blue-600 font-bold">Voltar para a loja</button>
      </div>
    );
  }

  const precoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(livro.preco);
  const temEstoque = livro.estoque > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* IMAGEM */}
        <div className="flex justify-center">
          <img 
            src={livro.imagemCapa || "https://placehold.co/400x600?text=Sem+Capa"} 
            alt={livro.titulo}
            className={`rounded-2xl shadow-2xl max-h-[500px] object-cover ${!temEstoque && 'grayscale'}`}
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-black text-slate-900 mb-2">{livro.titulo}</h1>
          <p className="text-xl text-blue-600 font-medium mb-6">
            {livro.autor?.nome} {livro.autor?.sobrenome}
          </p>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-black text-slate-900">{precoFormatado}</span>
              {temEstoque ? (
                <span className="text-green-600 flex items-center gap-1 text-sm font-bold">
                  <CheckCircle size={16} /> Em estoque ({livro.estoque})
                </span>
              ) : (
                <span className="text-red-500 flex items-center gap-1 text-sm font-bold">
                  <XCircle size={16} /> Esgotado
                </span>
              )}
            </div>

            <button 
              onClick={() => adicionarLivro(livro)}
              disabled={!temEstoque}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all
                ${temEstoque ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
            >
              <ShoppingCart size={20} />
              {temEstoque ? "Adicionar ao Carrinho" : "Produto Indisponível"}
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 border-b pb-2">
              <BookOpen size={20} className="text-blue-600" /> Sinopse
            </h3>
            <p className="text-slate-600 leading-relaxed text-justify">
              {livro.descricao || "Nenhuma descrição disponível para este título."}
            </p>
          </div>
          
          <div className="mt-8 flex items-center gap-4 text-xs font-bold text-slate-400 uppercase">
             <div className="flex items-center gap-1"><Info size={14}/> ID: {livro.id}</div>
             <div>•</div>
             <div>Categoria: {livro.categoria || "Geral"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}