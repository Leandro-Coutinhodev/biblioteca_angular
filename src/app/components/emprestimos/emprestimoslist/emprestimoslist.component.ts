import { Component, inject } from '@angular/core';
import { Emprestimo } from '../../../models/emprestimo';
import { EmprestimosService } from '../../../services/emprestimos.service';
import Swal from 'sweetalert2';
import { NavigationService } from '../../../services/navigation.service';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-emprestimoslist',
  standalone: true,
  imports: [TableModule, CardModule, CommonModule, MdbRippleModule, RouterLink],
  templateUrl: './emprestimoslist.component.html',
  styleUrl: './emprestimoslist.component.css'
})
export class EmprestimoslistComponent {

  lista: Emprestimo[] = [];

  emprestimoService = inject(EmprestimosService);
  navigation = inject(NavigationService);

  constructor(){
    this.findAll()
  }
  findAll(){
    this.emprestimoService.findAll().subscribe({
      next: retorno => {
        console.log(retorno);
        retorno.forEach(data => {
          data.data = new Date(data.data)});
        this.lista = retorno;
      },
      error: erro => {
        Swal.fire({
          icon: 'error',
          title: 'Houve algum erro!',
          confirmButtonColor: '#000'
        })
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
        this.emprestimoService.delete(id).subscribe({
          next: retorno => {
            Swal.fire({
              title: retorno,
              confirmButtonColor: "#000",
              icon: "success"
            });
            this.navigation.redirecionar('/admin/emprestimos', 1500);
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
  
  })
  }
}
