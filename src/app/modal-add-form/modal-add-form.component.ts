import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from '../../shared/emtities';

@Component({
  selector: 'app-modal-add-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-add-form.component.html',
  styleUrl: './modal-add-form.component.css'
})
export class ModalAddFormComponent implements OnInit{
  studentForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {}

  close() {
    this.activeModal.dismiss();
  }

  ngOnInit() {
      this.studentForm = this.formBuilder.group({
        name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(35),
          Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)
        ]
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(35),
          Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)
        ]
      ],
      age: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(120)
        ]
      ],
      dni: [
        '',
        [
          Validators.required,
          Validators.min(1000000),
          Validators.max(99999999)
        ]
      ],
      average: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(10)
        ]
      ]
      });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.activeModal.close(this.studentForm.value as Student);
    } else {
      this.studentForm.markAllAsTouched();
    }
  }
}
