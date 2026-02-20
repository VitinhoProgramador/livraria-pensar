import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Livro } from "../types/Livro";


// Definimos o que tem dentro do item do carrinho (o livro + a quantidade)
interface CartItem extends Livro {
  quantidade: number;
}

interface CartContextData {
  items: CartItem[];
  adicionarLivro: (livro: Livro) => void;
  removerLivro: (livroId: number) => void;
  limparCarrinho: () => void;
  diminuirQuantidade: (livroId: number) => void;
  totalItens: number;
  valorTotal: number;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const storagedCart = localStorage.getItem("@LivrariaPensar:carrinho");
    return storagedCart ? JSON.parse(storagedCart) : [];
  });

  // Salva no localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem("@LivrariaPensar:carrinho", JSON.stringify(items));
  }, [items]);

  const adicionarLivro = (livro: Livro) => {
    setItems(prevItems => {
      const itemExiste = prevItems.find(item => item.id === livro.id);

      if (itemExiste) {
        // Trava de Estoque: Só aumenta se for menor que o estoque total
        if (itemExiste.quantidade < livro.estoque) {
          return prevItems.map(item =>
            item.id === livro.id ? { ...item, quantidade: item.quantidade + 1 } : item
          );
        } else {
          alert(`Desculpe, só temos ${livro.estoque} unidades deste livro em estoque.`);
          return prevItems;
        }
      }
      return [...prevItems, { ...livro, quantidade: 1 }];
    });
  };

  const diminuirQuantidade = (livroId: number) => {
    setItems(prevItems => {
      const item = prevItems.find(i => i.id === livroId);
      
      // Se a quantidade for maior que 1, apenas diminui
      if (item && item.quantidade > 1) {
        return prevItems.map(i => 
          i.id === livroId ? { ...i, quantidade: i.quantidade - 1 } : i
        );
      }
      
      // Se for 1 e clicar em diminuir, remove do carrinho
      return prevItems.filter(i => i.id !== livroId);
    });
  };

  const removerLivro = (livroId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== livroId));
  };

  const limparCarrinho = () => setItems([]);

  const totalItens = items.reduce((sum, item) => sum + item.quantidade, 0);
  const valorTotal = items.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

  return (
    <CartContext.Provider value={{ items, adicionarLivro, diminuirQuantidade, removerLivro, limparCarrinho, totalItens, valorTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);