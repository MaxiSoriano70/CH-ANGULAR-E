import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../shared/emtities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEditFormComponent } from './modal-edit-form/modal-edit-form.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { StudentsTableComponent } from './students-table/students-table.component';
import { NuestrosSponsorsComponent } from './nuestros-sponsors/nuestros-sponsors.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ToolbarComponent,
    FooterComponent,
    StudentsTableComponent,
    NuestrosSponsorsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-entrega-1';
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
}
