import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuariosform',
  standalone: true,
  imports: [MdbFormsModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './usuariosform.component.html',
  styleUrl: './usuariosform.component.css'
})
export class UsuariosformComponent {

  usuario: Usuario = new Usuario();

  usuarioService = inject(UsuariosService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  constructor(){
    let id = this.route.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  findById(id: number){
    this.usuarioService.findById(id).subscribe({
      next: retorno => {
        this.usuario = retorno;
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
    if(this.usuario.id !== null && this.usuario.id > 0){
      this.usuarioService.update(this.usuario).subscribe({
        next: retorno => {
          Swal.fire({
            icon: "success",
            title: retorno,
            confirmButtonColor: "#000"
          });
          this.router.navigate(['/admin/usuarios'])
        },
        error: erro => {
          Swal.fire({
            icon: "error",
            title: "Erro ao editar registro!",
            confirmButtonColor: "#000"
          });
        }
      })
    }else{
      this.usuarioService.save(this.usuario).subscribe({
        next: retorno => {
          Swal.fire({
            icon: "success",
            title: retorno,
            confirmButtonColor: "#000"
          });
          this.router.navigate(['/admin/usuarios'])
        },
        error: erro => {
          Swal.fire({
            icon: "error",
            title: "Erro ao salvar!",
            confirmButtonColor: "#000"
          });
        }
      })
    }
  }
}
