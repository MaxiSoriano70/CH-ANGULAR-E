import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddFormComponent } from '../modal-add-form/modal-add-form.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent {
  constructor(private modalService: NgbModal) {}

  abrirModal() {
    this.modalService.open(ModalAddFormComponent, { centered: true });
  }
}
