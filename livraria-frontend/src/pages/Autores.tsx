import { useEffect, useState } from "react";
import type { Autor } from "../types/Autor";
import { listarAutores } from "../services/autorService";

export function Autor() {
  const [livros, setLivros] = useState<Autor[]>([]);

  useEffect(() => {
    listarAutores().then(response => {
      if (response.status) {
        setLivros(response.dados);
      }
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Livros</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {livros.map(livro => (
          <div
            key={livro.idAutor}
            className="border rounded-lg p-4 shadow"
          >
            <h2 className="font-semibold">{livro.nome}</h2>

          </div>
        ))}
      </div>
    </div>
  );
}
