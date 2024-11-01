import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Autor } from '../../../models/autor';
import { AutoresserviceService } from '../../../services/autoresservice.service';
import Swal from 'sweetalert2';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-autoreslist',
  standalone: true,
  imports: [TableModule, CardModule, CommonModule, MdbRippleModule, RouterLink],
  templateUrl: './autoreslist.component.html',
  styleUrl: './autoreslist.component.css'
})
export class AutoreslistComponent {

  lista: Autor[] = [];
  navigation = inject(NavigationService);

  autorService = inject(AutoresserviceService);
  constructor(){
    this.findAll();
  }

  findAll(){
    this.autorService.findAll().subscribe({
      next: retorno => {
        this.lista = retorno;
      },
      error: erro => {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Houve algum erro ao carregar a lista",
          confirmButtonColor: "#000"
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
        this.autorService.delete(id).subscribe({
          next: retorno => {
            Swal.fire({
              title: retorno,
              confirmButtonColor: "#000",
              icon: "success"
            });
            this.navigation.redirecionar('/admin/autores', 1500)
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
