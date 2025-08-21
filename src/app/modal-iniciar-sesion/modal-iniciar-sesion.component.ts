import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-iniciar-sesion',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-iniciar-sesion.component.html',
  styleUrl: './modal-iniciar-sesion.component.css'
})
export class ModalIniciarSesionComponent {
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Datos:', form.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
