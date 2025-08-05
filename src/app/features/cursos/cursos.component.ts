import { Component, OnInit } from '@angular/core';
import { ToolbarCourseComponent } from "../../toolbar-course/toolbar-course.component";
import { NuestrosSponsorsComponent } from "../../nuestros-sponsors/nuestros-sponsors.component";
import { CoursesTableComponent } from "../../courses-table/courses-table.component";
import { CommonModule } from '@angular/common';
import { Course } from '../../../shared/emtities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CursosAPIService } from './cursos-api.service';
import { ModalEditFormCourseComponent } from '../../modal-edit-form-course/modal-edit-form-course.component';
declare const swal: any;

@Component({
  selector: 'app-cursos',
  imports: [CommonModule, NuestrosSponsorsComponent, ToolbarCourseComponent, CoursesTableComponent],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements OnInit{
  courses: Course[] = [];

  constructor(private cursosApi: CursosAPIService, private modalService: NgbModal) {}
  /* SUBSCRIBE NOTIFICA QUE YA LLEGO */
  ngOnInit(): void {
    this.cursosApi.getCursos().subscribe(data => {
      this.courses = data;
    });
  }

  onCourseAdded(course: Course) {
    console.log('Recibido en AppComponent:', course);
    this.courses = [...this.courses, course];
  }

  openEditModal(course: Course): void {
    const modalRef = this.modalService.open(ModalEditFormCourseComponent);
    modalRef.componentInstance.course = course;

    modalRef.result.then((updatedCourse: Course) => {
      if (updatedCourse) {
        this.courses = this.courses.map(s =>
          s.code === updatedCourse.code ? updatedCourse : s
        );
      }
    }).catch(() => {});
  }

  onCourseDeleted(course: Course): void {
    swal({
      title: '¿Estás seguro?',
      text: `Eliminar al curso: ${course.name}`,
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
          this.courses = this.courses.filter(s => s.code !== course.code);
          swal('¡Eliminado!', 'El curso fue eliminado correctamente.', 'success');
        } catch (error) {
          swal('Error', 'Ocurrió un error al eliminar el curso.', 'error');
        }
      }
    });
  }
}
