import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../../shared/entities';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
declare const swal: any;

@Component({
  selector: 'app-modal-edit-form-student',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-edit-form-student.component.html',
  styleUrl: './modal-edit-form-student.component.css'
})
export class ModalEditFormStudentComponent implements OnInit{
  @Input() student!: Student;
  studentForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      id: [this.student.id],
      name: [this.student.name, [Validators.required]],
      surname: [this.student.surname, [Validators.required]],
      age: [this.student.age, [Validators.required, Validators.min(1), Validators.max(120)]],
      dni: [this.student.dni, [Validators.required]],
      average: [this.student.average, [Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      swal({
        title: '¿Guardar cambios?',
        text: 'Confirmar cambios del estudiante.',
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
            this.activeModal.close(this.studentForm.value as Student);
            swal('¡Éxito!', 'Los cambios fueron guardados correctamente.', 'success');
          } catch (error) {
            swal('Error', 'Ocurrió un error al guardar los cambios.', 'error');
          }
        }
      });
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
