import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          📚 Livraria
        </Link>

        {/* LINKS */}
        <div className="flex gap-6 text-sm font-medium">
          <Link
            to="/"
            className="hover:text-blue-400 transition"
          >
            Início
          </Link>

          <Link
            to="/livros"
            className="hover:text-blue-400 transition"
          >
            Livros
          </Link>

          <Link
            to="/autores"
            className="hover:text-blue-400 transition"
          >
            Autores
          </Link>
        </div>

        {/* AÇÕES */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-sm hover:text-blue-400 transition"
              >
                Entrar
              </Link>

              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Registrar
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-300">
                Olá, <strong>{user.username}</strong>
              </span>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
