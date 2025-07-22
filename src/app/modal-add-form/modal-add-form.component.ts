import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-add-form',
  standalone: true,
  imports: [],
  templateUrl: './modal-add-form.component.html',
  styleUrl: './modal-add-form.component.css'
})
export class ModalAddFormComponent {
  constructor(public activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.dismiss();
  }
}
