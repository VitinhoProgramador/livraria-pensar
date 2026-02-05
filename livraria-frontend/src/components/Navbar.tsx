import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { 
  BookOpen, 
  Home, 
  Library, 
  Users, 
  LogIn, 
  UserPlus, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Função para verificar rota ativa
  const isActive = (path: string) => location.pathname === path;

  // Fecha o menu ao clicar em um link (UX importante para mobile)
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* --- LOGO --- */}
        <Link 
          to="/" 
          onClick={closeMenu}
          className="flex items-center gap-2 group z-50"
        >
          <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
            <BookOpen className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-blue-200 transition-all duration-300">
            Livraria
          </span>
        </Link>

        {/* --- DESKTOP NAVIGATION (Hidden on Mobile) --- */}
        <div className="hidden md:flex items-center bg-slate-900/50 rounded-full px-2 py-1 border border-slate-800/50">
          <NavLink to="/" icon={<Home size={18} />} text="Início" active={isActive('/')} />
          <div className="w-px h-4 bg-slate-800 mx-1"></div>
          <NavLink to="/livros" icon={<Library size={18} />} text="Livros" active={isActive('/livros')} />
          <div className="w-px h-4 bg-slate-800 mx-1"></div>
          <NavLink to="/autores" icon={<Users size={18} />} text="Autores" active={isActive('/autores')} />
        </div>

        {/* --- DESKTOP ACTIONS (Hidden on Mobile) --- */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" className="text-slate-300 hover:text-white transition-colors text-sm font-medium px-4 py-2 flex items-center gap-2">
                <LogIn size={18} /> Entrar
              </Link>
              <Link to="/register" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-blue-900/20 transition-all hover:scale-105 active:scale-95">
                <UserPlus size={18} /> Registrar
              </Link>
            </>
          ) : (
            <UserDropdown user={user} logout={logout} />
          )}
        </div>

        {/* --- MOBILE TOGGLE BUTTON --- */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors z-50"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {/* Renderização condicional: Se isOpen for true, mostra o menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-slate-950 border-b border-slate-800 shadow-2xl animate-in slide-in-from-top-5 duration-200">
          <div className="p-4 flex flex-col gap-2">
            
            {/* Links Mobile */}
            <MobileNavLink to="/" icon={<Home size={18} />} text="Início" active={isActive('/')} onClick={closeMenu} />
            <MobileNavLink to="/livros" icon={<Library size={18} />} text="Livros" active={isActive('/livros')} onClick={closeMenu} />
            <MobileNavLink to="/autores" icon={<Users size={18} />} text="Autores" active={isActive('/autores')} onClick={closeMenu} />

            <div className="h-px bg-slate-800 my-2"></div>

            {/* Ações Mobile */}
            {!user ? (
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-900 transition-colors">
                  <LogIn size={18} /> Entrar na conta
                </Link>
                <Link to="/register" onClick={closeMenu} className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors">
                  <UserPlus size={18} /> Criar conta grátis
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400">Logado como</span>
                    <span className="text-sm font-semibold text-white">{user.username}</span>
                  </div>
                </div>
                <button 
                  onClick={() => { logout(); closeMenu(); }}
                  className="flex items-center gap-2 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-medium"
                >
                  <LogOut size={18} /> Sair do sistema
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ---------------- COMPONENTES AUXILIARES ---------------- */

// Link Desktop (Estilo "Cápsula")
function NavLink({ to, icon, text, active }: { to: string; icon: React.ReactNode; text: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${active 
          ? "bg-blue-600/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
          : "text-slate-400 hover:text-white hover:bg-slate-800/50"}
      `}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

// Link Mobile (Estilo "Lista Larga")
function MobileNavLink({ to, icon, text, active, onClick }: { to: string; icon: React.ReactNode; text: string; active: boolean; onClick: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
        ${active 
          ? "bg-blue-600/10 text-blue-400 border border-blue-600/20" 
          : "text-slate-400 hover:text-white hover:bg-slate-800"}
      `}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

// Dropdown de Usuário Desktop
function UserDropdown({ user, logout }: { user: any, logout: () => void }) {
  return (
    <div className="flex items-center gap-4 pl-4 border-l border-slate-800">
      <div className="flex flex-col text-right hidden lg:block">
        <span className="text-xs text-slate-400">Olá,</span>
        <span className="text-sm font-semibold text-white">{user.username}</span>
      </div>
      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md cursor-default">
        {user.username.charAt(0).toUpperCase()}
      </div>
      <button onClick={logout} title="Sair" className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all">
        <LogOut size={20} />
      </button>
    </div>
  );
}