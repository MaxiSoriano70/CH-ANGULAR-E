import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NuestrosSponsorsComponent } from '../../nuestros-sponsors/nuestros-sponsors.component';
import { StudentsTableComponent } from '../../students-table/students-table.component';
import { Student } from '../../../shared/entities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlumnosAPIService } from './alumnos-api.service';
import { ToolbarStudentComponent } from "../../toolbar-student/toolbar-student.component";
import { ModalEditFormStudentComponent } from '../../modal-edit-form-student/modal-edit-form-student.component';
import { Observable, of, switchMap } from 'rxjs';
import { LoadingComponent } from "../../loading/loading.component";
declare const swal: any;

@Component({
  selector: 'app-alumnos',
  imports: [CommonModule, NuestrosSponsorsComponent, ToolbarStudentComponent, StudentsTableComponent, LoadingComponent],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent implements OnInit{
  /* DUDA PIPE ASYNC */
  students$!: Observable<Student[]>;

  constructor(private alumnosApi: AlumnosAPIService, private modalService: NgbModal) {}
  /* SUBSCRIBE NOTIFICA QUE YA LLEGO */
  ngOnInit(): void {
    this.students$ = this.alumnosApi.getAlumnos();
  }

  private loadStudents() {
    this.students$ = this.alumnosApi.getAlumnos();
  }

  onStudentAdded(student: Student) {
    this.alumnosApi.addAlumno(student).pipe(
      switchMap(() => {
        this.loadStudents();
        return of (null);
      })
    ).subscribe({
      next: () => swal('Éxito', 'Estudiante agregado correctamente.', 'success'),
      error: () => swal('Error', 'No se pudo agregar el estudiante.', 'error')
    });
  }

  openEditModal(student: Student): void {
    const modalRef = this.modalService.open(ModalEditFormStudentComponent);
    modalRef.componentInstance.student = student;

    modalRef.result.then((updatedStudent: Student) => {
      if (updatedStudent) {
          this.alumnosApi.updateAlumno(updatedStudent).pipe(
            switchMap(() => {
              this.loadStudents();
              return of(null);
            })
          ).subscribe({
            next: () => swal('Éxito', 'Datos actualizados correctamente.', 'success'),
            error: () => swal('Error', 'Ocurrió un error al actualizar el estudiante.', 'error')
          });
        }
      }).catch(() => {});
  }


  onStudentDeleted(student: Student): void {
    swal({
      title: '¿Estás seguro?',
      text: `Eliminar al estudiante: ${student.name} ${student.surname}`,
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
        this.alumnosApi.deleteAlumno(student).pipe(
          switchMap(() => {
            this.loadStudents();
            return of (null);
          })
        ).subscribe({
          next: () => swal('¡Eliminado!', 'El estudiante fue eliminado correctamente.', 'success'),
          error: () => swal('Error', 'Ocurrió un error al eliminar el estudiante.', 'error')
        });
      }
    });
  }
}
