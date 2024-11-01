import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Emprestimo } from '../../../models/emprestimo';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';
import Swal from 'sweetalert2';
import { CustomSelectComponent } from '../../../select/custom-select/custom-select.component';
import { EmprestimosService } from '../../../services/emprestimos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Livro } from '../../../models/livro';
import { LivroserviceService } from '../../../services/livroservice.service';
import { NavigationService } from '../../../services/navigation.service';
import { GoogleDriveService } from '../../../services/google-drive.service';


@Component({
  selector: 'app-emprestimosform',
  standalone: true,
  imports: [MdbFormsModule, ReactiveFormsModule, CommonModule, FormsModule, CustomSelectComponent, NgbDatepickerModule, FormsModule],
  templateUrl: './emprestimosform.component.html',
  styleUrl: './emprestimosform.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmprestimosformComponent {

  displayMonths = 2;
	navigation = 'select';
	showWeekNumbers = false;
	outsideDays = 'visible';

  emprestimo: Emprestimo = new Emprestimo();
  usuarios: Usuario[] = [];
  livroSearch = '';
  livrosFiltrados: Livro[] = [];
  livroOptionList: Livro[] = [];
  showSuggestions = false;

  usuarioService = inject(UsuariosService);
  emprestimoService = inject(EmprestimosService);
  livroService = inject(LivroserviceService);
  route = inject(ActivatedRoute);
  navigator = inject(NavigationService);
 
  selectedDate!: NgbDateStruct;


  constructor(){
    let id = this.route.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
    this.usuariosOption();
    this.livrosOption();
  }

  showLabel() {
    const label = document.querySelector('.select-label') as HTMLElement;
    if (label) {
      label.classList.add('active');
    }
  }

  hideLabel() {
    const label = document.querySelector('.select-label') as HTMLElement | null;
    if (label && this.emprestimo.usuario === null) {
      label.classList.remove('active');
    }
  }
  

  getData(){
    const agora = new Date();


    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const ano = agora.getFullYear();

    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');

    const dataHoraFormatada = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;

    return new Date(dataHoraFormatada);
  }

  convertStringToDate(dateString: string): Date {
      const [datePart, timePart] = dateString.split(':');
      const [day, month, year] = datePart.split('-').map(Number);
      const [hours, minutes] = timePart.split(':').map(Number);
      
      return new Date(year, month - 1, day, hours, minutes);
  }
  onSearch(){
    if(this.livroSearch.trim()){
      this.livrosFiltrados = this.livroOptionList.filter(livro => 
        livro.titulo.toLowerCase().includes(this.livroSearch.toLowerCase())
      );
      this.showSuggestions = true;
    }else {
      this.showSuggestions = false;
    }
  }

  selectLivro(livro: Livro){
    if(!this.emprestimo.livros.includes(livro)){
      this.emprestimo.livros.push(livro);
    }
      this.livroSearch = '';
      this.showSuggestions = false;
  }

  removerLivro(livro: Livro){
    this.emprestimo.livros = this.emprestimo.livros.filter(a => a !== livro);
  }

  livrosOption(){
    this.livroService.findAll().subscribe({
      next: retorno => {
        this.livroOptionList = retorno;
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

  usuariosOption(){
    this.usuarioService.findAll().subscribe({
      next: retorno => {
        this.usuarios = retorno;
        console.log(this.usuarios);
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

  findById(id: number){
    this.emprestimoService.findById(id).subscribe({
      next: retorno => {
        this.emprestimo = retorno;
        const usuarioExistente = this.usuarios.find(usuario => usuario.id === this.emprestimo.usuario.id);
        if (usuarioExistente) {
          this.emprestimo.usuario = usuarioExistente;
        }
        console.log(this.emprestimo.usuario);
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
  salvar(){ 
    if(this.emprestimo !== null && this.emprestimo.id > 0){
      this.emprestimoService.update(this.emprestimo).subscribe({
        next: retorno => {
          Swal.fire({
            icon: 'success',
            title: retorno,
            confirmButtonColor: '#000'
          });
          this.navigator.redirecionar('/admin/emprestimos', 1500);
        },
        error: erro => {
          Swal.fire({
            icon: 'error',
            text: 'Erro ao editar registro!',
            confirmButtonColor: '#000'
          });
        }
      })
    }else{
      this.emprestimo.data = this.getData();
      this.emprestimoService.save(this.emprestimo).subscribe({
        next: retorno => {
          Swal.fire({
            icon: 'success',
            title: retorno,
            confirmButtonColor: '#000'
          });
          this.navigator.redirecionar('/admin/emprestimos', 1500);
        },
        error: erro => {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao salvar!',
            confirmButtonColor: '#000'
          });
        }
      })
    }
  }
}
