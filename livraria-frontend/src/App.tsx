import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Componentes e Layouts
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ConfirmarEmail } from "./components/ConfirmarEmail";

// Páginas
import { Home } from "./pages/Home";
import { Livros } from "./pages/Livros";
import { DetalhesLivro } from "./pages/DetalhesLivro";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Autor } from "./pages/Autores";
import { Carrinho } from "./pages/Carrinho";
import { Perfil } from "./pages/Perfil";
// import { DetalhesLivro } from "./pages/DetalhesLivro"; // Vamos criar em seguida

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          
          <main className="min-h-screen bg-slate-50">
            <Routes>
              {/* --- ROTAS PÚBLICAS --- */}
              <Route path="/" element={<Home />} />
              <Route path="/livros" element={<Livros />} />
              <Route path="/autores" element={<Autor />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/confirmar-email" element={<ConfirmarEmail />} />
              <Route path="/carrinho" element={<Carrinho />} />
              
              {/* Rota de Detalhes (Dinâmica) */}
              {<Route path="/livro/:id" element={<DetalhesLivro />} /> }

              {/* --- ROTAS PROTEGIDAS (Exigem Login) --- */}
              <Route 
                path="/perfil" 
                element={
                  <ProtectedRoute>
                    <Perfil />
                  </ProtectedRoute>
                } 
              />

              {/* Rota 404 - Caso o usuário digite algo inexistente */}
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center py-20">
                  <h1 className="text-4xl font-bold text-slate-800">404</h1>
                  <p className="text-slate-600">Ops! Essa página não existe.</p>
                </div>
              } />
            </Routes>
          </main>
          
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;