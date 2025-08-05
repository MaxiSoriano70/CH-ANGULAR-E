import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NuestrosSponsorsComponent } from '../../nuestros-sponsors/nuestros-sponsors.component';
import { StudentsTableComponent } from '../../students-table/students-table.component';
import { Student } from '../../../shared/emtities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlumnosAPIService } from './alumnos-api.service';
import { ToolbarStudentComponent } from "../../toolbar-student/toolbar-student.component";
import { ModalEditFormStudentComponent } from '../../modal-edit-form-student/modal-edit-form-student.component';
declare const swal: any;

@Component({
  selector: 'app-alumnos',
  imports: [CommonModule, NuestrosSponsorsComponent, ToolbarStudentComponent, StudentsTableComponent],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent implements OnInit{
  students: Student[] = [];

  constructor(private alumnosApi: AlumnosAPIService, private modalService: NgbModal) {}
  /* SUBSCRIBE NOTIFICA QUE YA LLEGO */
  ngOnInit(): void {
    this.alumnosApi.getAlumnos().subscribe(data => {
      this.students = data;
    });
  }

  onStudentAdded(student: Student) {
    console.log('Recibido en AppComponent:', student);
    this.students = [...this.students, student];
  }

  openEditModal(student: Student): void {
    const modalRef = this.modalService.open(ModalEditFormStudentComponent);
    modalRef.componentInstance.student = student;

    modalRef.result.then((updatedStudent: Student) => {
      if (updatedStudent) {
        this.students = this.students.map(s =>
          s.dni === updatedStudent.dni ? updatedStudent : s
        );
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
        try {
          this.students = this.students.filter(s => s.dni !== student.dni);
          swal('¡Eliminado!', 'El estudiante fue eliminado correctamente.', 'success');
        } catch (error) {
          swal('Error', 'Ocurrió un error al eliminar el estudiante.', 'error');
        }
      }
    });
  }
}
