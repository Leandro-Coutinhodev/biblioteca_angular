import { Component, inject, NgModule } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Livro } from '../../../models/livro';
import { CommonModule } from '@angular/common';
import { AutoresserviceService } from '../../../services/autoresservice.service';
import { Autor } from '../../../models/autor';
import Swal from 'sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroserviceService } from '../../../services/livroservice.service';
import { GoogleDriveService } from '../../../services/google-drive.service';


@Component({
  selector: 'app-livrosform',
  standalone: true,
  imports: [MdbFormsModule, ReactiveFormsModule, CommonModule, FormsModule, NgSelectModule],
  templateUrl: './livrosform.component.html',
  styleUrl: './livrosform.component.css'
})
export class LivrosformComponent {

  livro: Livro = new Livro();

  route = inject(ActivatedRoute);
  router = inject(Router);
  livroService = inject(LivroserviceService);
  autorService = inject(AutoresserviceService);
  
  autoresFiltrados: Autor[] = [];
  autorOptionList: Autor[] = [];
  autorSearch = '';
  showSuggestions = false;

  constructor(){
    let id = this.route.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
    this.autorOptions();
  }

  onSearch(){
    if(this.autorSearch.trim()){
      this.autoresFiltrados = this.autorOptionList.filter(autor => 
        autor.nome.toLowerCase().includes(this.autorSearch.toLowerCase())
      );
      this.showSuggestions = true;
    }else {
      this.showSuggestions = false;
    }
  }

  selectAutor(autor: Autor){
    if(!this.livro.autores.includes(autor)){
      this.livro.autores.push(autor);
    }
      this.autorSearch = '';
      this.showSuggestions = false;
  }

  removerAutor(autor: Autor){
    this.livro.autores = this.livro.autores.filter(a => a !== autor);
  }

  autorOptions(){
    this.autorService.findAll().subscribe({
      next: lista => {
        console.log(lista);
        this.autorOptionList = lista;
      },
      error: erro => {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Houve algum erro ao listar as opções",
          confirmButtonColor: "#000"
        });
      }
    })
  }

  findById(id: number){
    this.livroService.findById(id).subscribe({
      next: retorno => {
        this.livro = retorno;
      },
      error: erro => {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Houve algum erro",
          confirmButtonColor: "#000"
        });
      }
    })
  }
  salvar(){
    if(this.livro.id !== null && this.livro.id > 0){
      this.livroService.update(this.livro).subscribe({
        next: retorno => {
          Swal.fire({
            icon: "success",
            title: retorno,
            confirmButtonColor: "#000"
          });
          this.router.navigate(['/admin/livros']);
        },
        error: erro => {
          Swal.fire({
            icon: "error",
            title: "Erro!",
            text: "Erro ao editar registro!",
            confirmButtonColor: "#000"
          });
        }
      })
    }else {
      this.livroService.save(this.livro).subscribe({
        next: retorno => {
          Swal.fire({
            icon: "success",
            title: retorno,
            confirmButtonColor: "#000"
          });
          this.router.navigate(['/admin/livros']);
        },
        error: erro => {
          Swal.fire({
            icon: "error",
            title: "Erro!",
            text: "Erro ao salvar!",
            confirmButtonColor: "#000"
          });
        }
      })
    }
  }
}
