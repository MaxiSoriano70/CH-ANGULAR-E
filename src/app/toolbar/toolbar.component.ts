import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddFormComponent } from '../modal-add-form/modal-add-form.component';
import { Student } from '../../shared/emtities';
declare const swal: any;

@Component({
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output() addStudent = new EventEmitter<Student>();

  constructor(private modalService: NgbModal) {}

  abrirModal() {
    const modalRef = this.modalService.open(ModalAddFormComponent, { centered: true });

    modalRef.result.then(
      (newStudent: Student) => {
        console.log('Nuevo estudiante:', newStudent);
        if (newStudent) {
          this.addStudent.emit(newStudent);
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
