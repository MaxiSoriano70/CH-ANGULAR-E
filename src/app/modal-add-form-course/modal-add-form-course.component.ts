import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from '../../shared/emtities';

@Component({
  selector: 'app-modal-add-form-course',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-add-form-course.component.html',
  styleUrl: './modal-add-form-course.component.css'
})
export class ModalAddFormCourseComponent {
  courseForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {}

  close() {
    this.activeModal.dismiss();
  }

  ngOnInit() {
      this.courseForm = this.formBuilder.group({
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^[a-zA-Z0-9 ]+$/)
          ]
        ],
        code: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^[a-zA-Z0-9]+$/)
          ]
        ],
        credits: [
          null,
          [
            Validators.required,
            Validators.min(1),
            Validators.max(100)
          ]
        ]
      });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.activeModal.close(this.courseForm.value as Course);
    } else {
      this.courseForm.markAllAsTouched();
    }
  }
}
