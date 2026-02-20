import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  LogOut,
  BookOpen,
  ChevronDown
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext"; // Importação correta do hook

export function Navbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, logout, isAuthenticated } = useAuth();
  
  //Extraindo total de itens do carrinho
  const { totalItens } = useCart();
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [termoBusca, setTermoBusca] = useState(searchParams.get("busca") || "");

  const handleSearch = () => {
    if (termoBusca.trim()) {
      navigate(`/?busca=${encodeURIComponent(termoBusca)}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-700 transition-colors">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tighter hidden sm:block">
            LIVRARIA<span className="text-blue-600">PENSAR</span>
          </span>
        </Link>

        {/* BARRA DE BUSCA */}
        <div className="flex-1 max-w-2xl relative group">
          <input
            type="text"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Qual livro você busca?"
            className="w-full bg-slate-100 border-2 border-transparent rounded-full py-2.5 pl-5 pr-12 focus:bg-white focus:border-blue-500 outline-none transition-all"
          />
          <button
            onClick={handleSearch}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-all"
          >
            <Search size={18} />
          </button>
        </div>

        <div className="flex items-center gap-5">
          {/* BOTÃO CARRINHO COM BADGE DINÂMICO */}
          <Link to="/carrinho" className="relative p-2 text-slate-600 hover:text-blue-600 transition-all">
            <ShoppingCart size={24} />
            {totalItens > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                {totalItens}
              </span>
            )}
          </Link>

          <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

          {/* ÁREA DO USUÁRIO */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs text-slate-400 font-medium leading-tight">Olá,</p>
                  <p className="text-sm font-bold text-slate-700 truncate max-w-[100px]">{user?.username}</p>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 mb-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">E-mail</p>
                    <p className="text-xs text-slate-600 truncate">{user?.email}</p>
                  </div>
                  <Link to="/perfil" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <User size={16} /> Meu Perfil
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={16} /> Sair da conta
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-sm transition-all shadow-lg shadow-blue-600/20">
              <User size={18} />
              <span>Entrar</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}