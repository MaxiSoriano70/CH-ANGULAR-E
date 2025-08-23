import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/entities';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { tipoUser } from '../../shared/tipoUser';
declare const swal: any;

@Component({
  selector: 'app-modal-edit-form-usuario',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-edit-form-usuario.component.html',
  styleUrl: './modal-edit-form-usuario.component.css'
})
export class ModalEditFormUsuarioComponent implements OnInit{
  @Input() user!: User;
  userForm!: FormGroup;
  tipoUserOptions = Object.values(tipoUser);

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [this.user.id],
      name: [this.user.name, [Validators.required]],
      surname: [this.user.surname, [Validators.required]],
      age: [this.user.age, [Validators.required, Validators.min(1), Validators.max(120)]],
      dni: [this.user.dni, [Validators.required]],
      average: [this.user.average, [Validators.required, Validators.min(1), Validators.max(10)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      role: [this.user.role, [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      swal({
        title: '¿Guardar cambios?',
        text: 'Confirmar cambios del usuario.',
        icon: 'warning',
        buttons: {
          cancel: 'Cancelar',
          confirm: {
            text: 'Sí, guardar',
            value: true,
          }
        },
        dangerMode: true
      }).then((willSave: boolean) => {
        if (willSave) {
          try {
            const updatedUser: User = {
            ...this.user,
            ...this.userForm.value
          };
          this.activeModal.close(updatedUser as User);
            swal('¡Éxito!', 'Los cambios fueron guardados correctamente.', 'success');
          } catch (error) {
            swal('Error', 'Ocurrió un error al guardar los cambios.', 'error');
          }
        }
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
