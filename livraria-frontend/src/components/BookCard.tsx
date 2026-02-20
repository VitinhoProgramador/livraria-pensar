import { ShoppingCart, User, PackageX } from "lucide-react";
import type { Livro } from "../types/Livro";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

interface BookCardProps {
  livro: Livro;
}

export function BookCard({ livro }: BookCardProps) {
  const { adicionarLivro } = useCart();

  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(livro.preco);

  const nomeAutor = livro.autor
    ? `${livro.autor.nome} ${livro.autor.sobrenome}`
    : "Autor Desconhecido";

  const imagemSrc = livro.imagemCapa && livro.imagemCapa.trim() !== ""
    ? livro.imagemCapa
    : "https://placehold.co/400x600/e2e8f0/1e293b?text=Sem+Capa";

  const temEstoque = livro.estoque > 0;

  return (
    <div className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full relative">

      {/* --- ÁREA DA IMAGEM (Clicável) --- */}
      <Link to={`/livro/${livro.id}`} className="block relative aspect-[2/3] overflow-hidden bg-slate-100 cursor-pointer">
        <img
          src={imagemSrc}
          alt={livro.titulo}
          className={`w-full h-full object-cover transition-transform duration-500 ${temEstoque ? 'group-hover:scale-105' : 'grayscale'}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/400x600/e2e8f0/1e293b?text=Erro+Img";
          }}
        />

        {/* Overlay de Esgotado */}
        {!temEstoque && (
          <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-white p-2">
            <PackageX size={32} className="mb-2 opacity-80" />
            <span className="font-bold uppercase tracking-widest text-xs">Esgotado</span>
          </div>
        )}

        {/* Badge de Estoque Baixo */}
        {temEstoque && livro.estoque < 5 && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm animate-pulse">
            Últimas Unidades
          </div>
        )}
      </Link>

      {/* --- CONTEÚDO --- */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-1">
          <User size={12} className="text-blue-500" />
          <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider truncate">
            {nomeAutor}
          </span>
        </div>

        {/* Título também é um Link agora */}
        <Link to={`/livro/${livro.id}`} className="hover:text-blue-600 transition-colors">
          <h3 className="text-slate-800 font-bold leading-tight mb-2 line-clamp-2 min-h-[2.5rem]" title={livro.titulo}>
            {livro.titulo}
          </h3>
        </Link>

        <p className="text-slate-500 text-xs line-clamp-2 mb-4">
          {livro.descricao}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className={`text-xl font-bold ${temEstoque ? 'text-slate-900' : 'text-slate-400'}`}>
              {precoFormatado}
            </p>
          </div>

          <button
            onClick={() => temEstoque && adicionarLivro(livro)}
            disabled={!temEstoque}
            title={temEstoque ? "Adicionar ao carrinho" : "Produto indisponível"}
            className={`p-3 rounded-lg transition-all duration-200 flex items-center justify-center
              ${temEstoque
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}