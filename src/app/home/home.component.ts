import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NuestrosSponsorsComponent } from '../nuestros-sponsors/nuestros-sponsors.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { StudentsTableComponent } from '../students-table/students-table.component';
import { Student } from '../../shared/emtities';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEditFormComponent } from '../modal-edit-form/modal-edit-form.component';
declare const swal: any;

@Component({
  selector: 'app-home',
  imports: [CommonModule, NuestrosSponsorsComponent, ToolbarComponent, StudentsTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  students: Student[] = [];

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.http.get<Student[]>('assets/mocks/students.json').subscribe(data => {
      this.students = data;
    });
  }

  onStudentAdded(student: Student) {
    console.log('Recibido en AppComponent:', student);
    this.students = [...this.students, student];
  }

  openEditModal(student: Student): void {
    const modalRef = this.modalService.open(ModalEditFormComponent);
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
