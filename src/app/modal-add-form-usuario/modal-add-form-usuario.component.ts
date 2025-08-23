import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../shared/entities';
import { tipoUser } from '../../shared/tipoUser';

@Component({
  selector: 'app-modal-add-form-usuario',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-add-form-usuario.component.html',
  styleUrl: './modal-add-form-usuario.component.css'
})

export class ModalAddFormUsuarioComponent implements OnInit{
  userForm!: FormGroup;
  tipoUserOptions = Object.values(tipoUser);

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder){}

  close() {
    this.activeModal.dismiss();
  }

  ngOnInit() {
      this.userForm = this.formBuilder.group({
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
      ],
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      role: [tipoUser.USER, Validators.required],
      password: ['']
      });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const cleanSurname = formValue.surname
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      formValue.password = `${cleanSurname}-1234`;

      this.activeModal.close(formValue as User);
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
