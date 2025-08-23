import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../shared/entities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddFormUsuarioComponent } from '../modal-add-form-usuario/modal-add-form-usuario.component';
declare const swal: any;

@Component({
  selector: 'app-toolbar-usuario',
  imports: [],
  templateUrl: './toolbar-usuario.component.html',
  styleUrl: './toolbar-usuario.component.css'
})
export class ToolbarUsuarioComponent {
  @Output() addUser = new EventEmitter<User>();

  constructor(private modalService: NgbModal) {}

  abrirModal() {
    const modalRef = this.modalService.open(ModalAddFormUsuarioComponent, { centered: true });

    modalRef.result.then(
      (newUser: User) => {
        if (newUser) {
          this.addUser.emit(newUser);
          swal("¡Éxito!", "El estudiante fue agregado correctamente.", "success");
        } else {
          swal("Error", "No se pudo agregar el estudiante.", "error");
        }
      },
      () => {
        swal("Cancelado", "No se agregó ningún estudiante.", "info");
      }
    );
  }
}
