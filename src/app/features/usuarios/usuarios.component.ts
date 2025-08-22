import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NuestrosSponsorsComponent } from '../../nuestros-sponsors/nuestros-sponsors.component';
import { ToolbarUsuarioComponent } from "../../toolbar-usuario/toolbar-usuario.component";
import { UsuarioTableComponent } from '../../usuario-table/usuario-table.component';
import { LoadingComponent } from '../../loading/loading.component';
import { Observable, of, switchMap } from 'rxjs';
import { User } from '../../../shared/entities';
import { UsuariosApiService } from './usuarios-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEditFormUsuarioComponent } from '../../modal-edit-form-usuario/modal-edit-form-usuario.component';
declare const swal: any;

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, NuestrosSponsorsComponent, ToolbarUsuarioComponent, UsuarioTableComponent, LoadingComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})

export class UsuariosComponent implements OnInit {
  /* DUDA PIPE ASYNC */
  users$!: Observable<User[]>;

  constructor(private usuariosApi: UsuariosApiService, private modalService: NgbModal) { }
  /* SUBSCRIBE NOTIFICA QUE YA LLEGO */
  ngOnInit(): void {
    this.users$ = this.usuariosApi.getUsuarios();
  }

  private loadUsers() {
    this.users$ = this.usuariosApi.getUsuarios();
  }

  onUserAdded(user: User) {
    this.usuariosApi.addUsuario(user).pipe(
      switchMap(() => {
        this.loadUsers();
        return of(null);
      })
    ).subscribe({
      next: () => swal('Éxito', 'Usuario agregado correctamente.', 'success'),
      error: () => swal('Error', 'No se pudo agregar el usuario.', 'error')
    });
  }

  openEditModal(user: User): void {
    const modalRef = this.modalService.open(ModalEditFormUsuarioComponent);
    modalRef.componentInstance.user = user;

    modalRef.result.then((updatedUser: User) => {
      if (updatedUser) {
        this.usuariosApi.updateUsuario(updatedUser).pipe(
          switchMap(() => {
            this.loadUsers();
            return of(null);
          })
        ).subscribe({
          next: () => swal('Éxito', 'Datos actualizados correctamente.', 'success'),
          error: () => swal('Error', 'Ocurrió un error al actualizar el usuario.', 'error')
        });
      }
    }).catch(() => { });
  }


  onUserDeleted(user: User): void {
    swal({
      title: '¿Estás seguro?',
      text: `Eliminar al usuario: ${user.name} ${user.surname}`,
      icon: 'warning',
      buttons: {
        cancel: 'Cancelar',
        confirm: {
          text: 'Sí, eliminar',
          value: true
        }
      },
      dangerMode: true
    }).then((willDelete: boolean) => {
      if (willDelete) {
        this.usuariosApi.deleteUsuario(user).pipe(
          switchMap(() => {
            this.loadUsers();
            return of(null);
          })
        ).subscribe({
          next: () => swal('¡Eliminado!', 'El usuario fue eliminado correctamente.', 'success'),
          error: () => swal('Error', 'Ocurrió un error al eliminar el usuario.', 'error')
        });
      }
    });
  }
}
