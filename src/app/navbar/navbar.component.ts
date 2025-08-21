import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutePaths } from '../../shared/routes';
import { ModalIniciarSesionComponent } from "../modal-iniciar-sesion/modal-iniciar-sesion.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, ModalIniciarSesionComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  routePaths = RoutePaths;
}
