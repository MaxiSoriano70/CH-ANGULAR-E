import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from '../../shared/emtities';
import { CommonModule } from '@angular/common';
declare const swal: any;

@Component({
  selector: 'app-modal-edit-form-course',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-edit-form-course.component.html',
  styleUrl: './modal-edit-form-course.component.css'
})
export class ModalEditFormCourseComponent implements OnInit{
  @Input() course!: Course;
  courseForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      name: [this.course.name, [Validators.required]],
      code: [this.course.code, [Validators.required]],
      credits: [this.course.credits, [Validators.required, Validators.min(1), Validators.max(100)]]
    })
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      swal({
        title: '¿Guardar cambios?',
        text: 'Confirmar cambios del curso.',
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
            this.activeModal.close(this.courseForm.value as Course);
            swal('¡Éxito!', 'Los cambios fueron guardados correctamente.', 'success');
          } catch (error) {
            swal('Error', 'Ocurrió un error al guardar los cambios.', 'error');
          }
        }
      });
    } else {
      this.courseForm.markAllAsTouched();
    }
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
