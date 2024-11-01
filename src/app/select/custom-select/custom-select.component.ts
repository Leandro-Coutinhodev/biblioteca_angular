import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.css'
})
export class CustomSelectComponent {
  
  @Input() usuarios: Usuario[] = []; // Use o tipo correto
  @Input() selectedValue: Usuario | null = null;
  @Output() selectedValueChange = new EventEmitter<Usuario | null>();

  onSelectChange() {
    this.selectedValueChange.emit(this.selectedValue); // Emite o objeto Usuario
  }

  showLabel() {
    const label = document.querySelector('.select-label') as HTMLElement;
    if (label) {
      label.classList.add('active');
    }
  }

  hideLabel() {
    const label = document.querySelector('.select-label') as HTMLElement | null;
    if (label && this.selectedValue === null) {
      label.classList.remove('active');
    }
  }
  
}