import { Component, OnInit } from '@angular/core';
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
import { FullnamePipe } from '../../shared/pipes/fullname.pipe';
declare const swal: any;

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FullnamePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  routePaths = RoutePaths;
  usuario$: Observable<User | null>;

  constructor(private modalService: NgbModal, private store: Store<{ sesion: Sesion }>) {
    this.usuario$ = this.store.select(state => state.sesion.usuarioLogueado);
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const usuarioGuardado = localStorage.getItem('usuarioLogueado');
      if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        this.store.dispatch(iniciarSesion({ usuario }));
      }
    }
  }

  abrirModal() {
    const modalRef = this.modalService.open(ModalIniciarSesionComponent, { centered: true });

    modalRef.result.then(
      (usuario) => {
        if (usuario && typeof localStorage !== 'undefined') {
          localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
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
    swal({
      title: "¿Estás seguro?",
      text: "Se cerrará tu sesión actual.",
      icon: "warning",
      buttons: ["Cancelar", "Sí, cerrar sesión"],
      dangerMode: true,
    }).then((confirmar: boolean) => {
      if (confirmar && typeof localStorage !== 'undefined') {
        localStorage.removeItem('usuarioLogueado');
        this.store.dispatch(cerrarSesion());
        swal({
          title: "Sesión cerrada",
          icon: "info",
          timer: 2000,
          buttons: false
        });
      }
    });
  }
}
