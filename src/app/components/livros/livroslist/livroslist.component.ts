import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { Livro } from '../../../models/livro';
import { LivroserviceService } from '../../../services/livroservice.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { Router, RouterLink } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';


@Component({
  selector: 'app-livroslist',
  standalone: true,
  imports: [TableModule, CardModule, CommonModule, MdbRippleModule, RouterLink],
  templateUrl: './livroslist.component.html',
  styleUrl: './livroslist.component.css'
})
export class LivroslistComponent {
lista: Livro[] = [];

livroService = inject(LivroserviceService);
navigation = inject(NavigationService);


constructor(){
this.findAll();
}

findAll(){
  this.livroService.findAll().subscribe({
    next: lista => {
      this.lista = lista;
      console.log(lista)
    },
    error: erro => {
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Houve algum erro ao carregar a lista",
        confirmButtonColor: "#3085d6"
      });
    }
  })
}

delete(id: number){
  Swal.fire({
    title: "Você tem certeza que deseja deletar este registro?",
    text: "Você não poderá reverter posteriormente!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Sim, tenho certeza"
  }).then((result) => {
    if (result.isConfirmed) {
      this.livroService.delete(id).subscribe({
        next: retorno => {
          Swal.fire({
            title: retorno,
            confirmButtonColor: "#000",
            icon: "success"
          });
          this.navigation.redirecionar('/admin/livros', 1500);
        },
        error: erro => {
          Swal.fire({
            title: "Erro ao deletar registro!",
            confirmButtonColor: "#000",
            icon: 'error'
      })
    }
  });
}

})}
}
