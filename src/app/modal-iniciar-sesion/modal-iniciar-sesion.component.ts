import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-iniciar-sesion',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-iniciar-sesion.component.html',
  styleUrl: './modal-iniciar-sesion.component.css'
})

export class ModalIniciarSesionComponent {
  constructor(public activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.dismiss();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Datos de login:', form.value);
      this.activeModal.close(form.value); // devolvemos los datos al navbar
    } else {
      console.log('Formulario inválido');
    }
  }
}
