import { Livro } from "./livro";
import { Usuario } from "./usuario";

export class Emprestimo {
  
  id!: number;
  data!: Date;

  usuario!: Usuario;

  livros: Livro[] = [];
}
