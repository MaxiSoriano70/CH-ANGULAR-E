import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutePaths } from '../../shared/routes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalIniciarSesionComponent } from "../modal-iniciar-sesion/modal-iniciar-sesion.component";
import { Store } from '@ngrx/store';
import { Sesion } from '../ngrx/sesion/sesion.model';
import { iniciarSesion, cerrarSesion } from '../ngrx/sesion/sesion.actions';
import { Observable } from 'rxjs';
import { User } from '../../shared/entities';
import { CommonModule } from '@angular/common';
declare const swal: any;

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  routePaths = RoutePaths;
  usuario$: Observable<User | null>;

  constructor(private modalService: NgbModal, private store: Store<{ sesion: Sesion }>) {
    this.usuario$ = this.store.select(state => state.sesion.usuarioLogueado);
  }

  abrirModal() {
    const modalRef = this.modalService.open(ModalIniciarSesionComponent, { centered: true });

    modalRef.result.then(
      (usuario) => {
        if (usuario) {
          this.store.dispatch(iniciarSesion({ usuario }));
          swal({
            title: `¡Bienvenido, ${usuario.name} ${usuario.surname}!`,
            icon: 'success',
            timer: 2000,
            buttons: false
          });
        }
      },
      () => {
        swal({
          title: 'Error',
          text: 'No se inició sesión',
          icon: 'error',
          timer: 2000,
          buttons: false
        });
      }
    );
  }

  cerrarSesion() {
    this.store.dispatch(cerrarSesion());
    swal({
      title: 'Sesión cerrada',
      icon: 'info',
      timer: 2000,
      buttons: false
    });
  }
}
