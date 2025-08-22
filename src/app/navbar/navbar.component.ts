import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutePaths } from '../../shared/routes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalIniciarSesionComponent } from "../modal-iniciar-sesion/modal-iniciar-sesion.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  routePaths = RoutePaths;

  constructor(private modalService: NgbModal) {}

  abrirModal() {
    const modalRef = this.modalService.open(ModalIniciarSesionComponent, { centered: true });

    modalRef.result.then(
      (data) => {
        if (data) {
          console.log('Usuario inició sesión:', data);
          // Acá podés guardar en un servicio, localStorage, etc.
        }
      },
      () => {
        console.log('Modal cerrado sin iniciar sesión');
      }
    );
  }
}
