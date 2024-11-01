import { Component, inject } from '@angular/core';
import { Livro } from '../../../models/livro';
import { LivroserviceService } from '../../../services/livroservice.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  lista: Livro[] = [];

  livroService = inject(LivroserviceService);

  constructor(){
    this.findAll();
  }

  findAll(){
    this.livroService.findAll().subscribe({
      next: retorno => {
        this.lista = retorno;
      },
      error: erro => {
        Swal.fire({
          icon: 'error',
          title: 'Houve algum erro!',
          confirmButtonColor: '#000'
        });
      }
    })
  }
}
