import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";

export function Carrinho() {
  const { items, adicionarLivro, removerLivro, diminuirQuantidade, valorTotal, totalItens } = useCart();

  const precoFormatado = (valor: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="bg-slate-100 p-6 rounded-full mb-4">
          <ShoppingBag size={48} className="text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Seu carrinho está vazio</h2>
        <p className="text-slate-500 mb-8">Parece que você ainda não escolheu seus livros.</p>
        <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
          <ArrowLeft size={20} /> Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        Meu Carrinho <span className="text-slate-400 text-lg">({totalItens} itens)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LISTA DE PRODUTOS */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4 items-center shadow-sm">
              <img
                src={item.imagemCapa || "https://placehold.co/400x600?text=Sem+Capa"}
                alt={item.titulo}
                className="w-20 h-28 object-cover rounded-lg shadow-sm"
              />

              <div className="flex-1">
                <h3 className="font-bold text-slate-800 line-clamp-1">{item.titulo}</h3>
                <p className="text-sm text-slate-500 mb-2">{item.autor?.nome} {item.autor?.sobrenome}</p>

                <div className="flex items-center justify-between">
                  {/* Controles de Quantidade */}
                  <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                    <button
                      onClick={() => diminuirQuantidade(item.id)} // 🟢 Agora diminui em 1
                      className="p-1 hover:bg-white rounded-md transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{item.quantidade}</span>
                    <button
                      onClick={() => adicionarLivro(item)} // 🟢 adicionarLivro já tem a trava de estoque
                      disabled={item.quantidade >= item.estoque}
                      className={`p-1 rounded-md transition-colors ${item.quantidade >= item.estoque ? 'text-slate-300' : 'hover:bg-white'
                        }`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <span className="font-bold text-slate-900">{precoFormatado(item.preco * item.quantidade)}</span>
                </div>
              </div>

              <button
                onClick={() => removerLivro(item.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* RESUMO DO PEDIDO */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 mb-6 italic underline">Resumo do Pedido</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{precoFormatado(valorTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Frete</span>
                <span className="text-green-600 font-bold uppercase text-xs">Grátis</span>
              </div>
              <div className="h-px bg-slate-100 w-full" />
              <div className="flex justify-between text-xl font-black text-slate-900">
                <span>Total</span>
                <span>{precoFormatado(valorTotal)}</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">
              Finalizar Compra
            </button>

            <Link to="/" className="block text-center mt-4 text-sm text-slate-500 hover:text-blue-600 font-medium">
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}