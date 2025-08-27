import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/entities';
import { EditPerfilService } from './edit-perfil.service';
declare const swal: any;

@Component({
  selector: 'app-modal-edit-form-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-edit-form-perfil.component.html',
  styleUrl: './modal-edit-form-perfil.component.css'
})
export class ModalEditFormPerfilComponent implements OnInit {
  @Input() user!: User;
  perfilForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private editPerfilService: EditPerfilService
  ) {}

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      id: [this.user.id],
      name: [this.user.name, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      surname: [this.user.surname, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      age: [this.user.age, [Validators.required, Validators.min(1), Validators.max(120)]],
      dni: [this.user.dni, [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
      average: [this.user.average, [Validators.required, Validators.min(1), Validators.max(10)]],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      swal({
        title: '¿Estás seguro?',
        text: 'Se guardarán los cambios en tu perfil',
        icon: 'warning',
        buttons: ['Cancelar', 'Sí, guardar'],
        dangerMode: true,
      }).then((willSave: boolean) => {
        if (willSave) {
          const updatedUser = {
            ...this.user,
            ...this.perfilForm.value
          };
          this.editPerfilService.updatePerfil(updatedUser).subscribe({
            next: (userFromApi) => {
              swal('¡Éxito!', 'Los cambios fueron guardados correctamente ✅', 'success');
              this.activeModal.close(userFromApi);
            },
            error: () => {
              swal('Error', 'Hubo un problema al guardar los cambios ❌', 'error');
              this.perfilForm.markAllAsTouched();
            }
          });
        }
      });
    } else {
      this.perfilForm.markAllAsTouched();
    }
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
