import { Autor } from "./autor";

export class Livro {
  id!: number;
  titulo!: string;
  editora!: string;
  ano!: number;
  imagem!: string;
  autores: Autor[] = [];
}
