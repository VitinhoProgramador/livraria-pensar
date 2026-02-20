import { useAuth } from "../contexts/AuthContext";
import { User, Mail, Package, MapPin, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Dados fictícios para o histórico de pedidos
  const pedidosFicticios = [
    { id: "#1234", data: "10/02/2026", status: "Entregue", total: 159.90 },
    { id: "#1230", data: "05/01/2026", status: "Processando", total: 89.00 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Minha Conta</h1>
          <p className="text-slate-500">Gerencie seus dados e acompanhe seus pedidos.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* COLUNA DA ESQUERDA: CARD DO USUÁRIO */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg shadow-blue-200">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-slate-800">{user?.username}</h2>
              <p className="text-sm text-slate-500 mb-6">{user?.email}</p>
              
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors">
                  <Settings size={18} /> Editar Perfil
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
                >
                  <LogOut size={18} /> Sair da Conta
                </button>
              </div>
            </div>

            {/* CARD DE INFORMAÇÕES RÁPIDAS */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">Informações de Contato</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail size={16} className="text-blue-500" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <MapPin size={16} className="text-blue-500" />
                  <span>Teresina, PI - Brasil</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DA DIREITA: HISTÓRICO DE PEDIDOS */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Package className="text-blue-600" size={20} />
                  Últimos Pedidos
                </h3>
                <button className="text-sm text-blue-600 font-bold hover:underline">Ver todos</button>
              </div>
              
              <div className="divide-y divide-slate-100">
                {pedidosFicticios.map((pedido) => (
                  <div key={pedido.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-bold text-slate-800">Pedido {pedido.id}</p>
                      <p className="text-xs text-slate-500">{pedido.data}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-slate-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pedido.total)}
                      </p>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        pedido.status === 'Entregue' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {pedido.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOX DE FAVORITOS OU SUGESTÕES */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-2">Leituras Recomendadas</h3>
              <p className="text-blue-100 mb-6">Baseado nos seus últimos pedidos, separamos algo especial para você.</p>
              <button 
                onClick={() => navigate('/')}
                className="bg-white text-blue-600 px-6 py-2 rounded-xl font-bold hover:bg-blue-50 transition-colors"
              >
                Explorar Catálogo
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}