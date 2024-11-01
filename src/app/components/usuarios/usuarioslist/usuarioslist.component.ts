import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouteReuseStrategy, RouterLink } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import Swal from 'sweetalert2';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-usuarioslist',
  standalone: true,
  imports: [TableModule, CardModule, CommonModule, MdbRippleModule, RouterLink],
  templateUrl: './usuarioslist.component.html',
  styleUrl: './usuarioslist.component.css'
})
export class UsuarioslistComponent {

  lista: Usuario[] = [];

  usuarioService = inject(UsuariosService);
  navigation = inject(NavigationService);

  constructor(){
    this.findAll();
  }

  findAll(){
    this.usuarioService.findAll().subscribe({
      next: retorno => {
        this.lista = retorno;
      },
      error: erro => {
        Swal.fire({
          'icon': 'error',
          'title': 'Houve algum erro!',
          'confirmButtonColor': '#000'
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
        this.usuarioService.delete(id).subscribe({
          next: retorno => {
            Swal.fire({
              title: retorno,
              confirmButtonColor: "#000",
              icon: "success"
            });
            this.navigation.redirecionar('/admin/usuarios', 1500);
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
