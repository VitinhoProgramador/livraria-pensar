import type {Autor} from "./Autor"


export interface Livro {
  id: number;
  titulo: string;
  descricao?: string;
  preco: number;
  imagemCapa?: string; 
  autor: Autor; 
  estoque: number;
}