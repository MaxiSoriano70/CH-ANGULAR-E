import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from '../../shared/emtities';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-edit-form.component.html',
  styleUrl: './modal-edit-form.component.css'
})

export class ModalEditFormComponent implements OnInit {
  @Input() student!: Student;
  studentForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: [this.student.name, [Validators.required]],
      surname: [this.student.surname, [Validators.required]],
      age: [this.student.age, [Validators.required, Validators.min(1), Validators.max(120)]],
      dni: [this.student.dni, [Validators.required]],
      average: [this.student.average, [Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.activeModal.close(this.studentForm.value as Student);
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
