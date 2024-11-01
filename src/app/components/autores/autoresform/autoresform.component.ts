import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Autor } from '../../../models/autor';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoresserviceService } from '../../../services/autoresservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autoresform',
  standalone: true,
  imports: [MdbFormsModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './autoresform.component.html',
  styleUrl: './autoresform.component.css'
})
export class AutoresformComponent {

  autor: Autor = new Autor();

  route = inject(ActivatedRoute);
  router = inject(Router);
  autorService = inject(AutoresserviceService);

  constructor(){
    let id = this.route.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  findById(id: number){
    this.autorService.findById(id).subscribe({
      next: retorno => {
        this.autor = retorno;
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
    if(this.autor.id !== null && this.autor.id > 0){
      this.autorService.update(this.autor).subscribe({
        next: retorno => {
          Swal.fire({
            icon: "success",
            title: retorno,
            confirmButtonColor: "#000"
          });
          this.router.navigate(['/admin/autores']);
        },
        error: erro => {
          Swal.fire({
            icon: "error",
            title: "Erro ao editar registro!",
            confirmButtonColor: "#000"
          });
        }
      })
    } else {
      this.autorService.save(this.autor).subscribe({
        next: retorno => {
          Swal.fire({
            icon: "success",
            title: retorno,
            confirmButtonColor: "#000"
          });
          this.router.navigate(['/admin/autores']);
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
