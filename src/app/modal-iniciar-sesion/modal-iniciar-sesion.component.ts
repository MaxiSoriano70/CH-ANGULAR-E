import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginApiService } from './login-api.service';
import { CommonModule } from '@angular/common';
declare const swal: any;

@Component({
  selector: 'app-modal-iniciar-sesion',
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
  templateUrl: './modal-iniciar-sesion.component.html',
  styleUrls: ['./modal-iniciar-sesion.component.css']
})
export class ModalIniciarSesionComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginApiService: LoginApiService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/)
      ]]
    });
  }

  close() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginApiService.login(email, password).subscribe(user => {
        if (user) {
          this.activeModal.close(user);
        } else {
          swal('Error', 'Email o contraseña incorrectos', 'error');
        }
      });
    } else {
      swal('Error', 'Complete correctamente el formulario', 'error');
    }
  }
}
