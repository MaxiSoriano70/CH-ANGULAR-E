import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditFormPerfilComponent } from './modal-edit-form-perfil.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ModalEditFormPerfilComponent', () => {
  let component: ModalEditFormPerfilComponent;
  let fixture: ComponentFixture<ModalEditFormPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditFormPerfilComponent],
      providers: [NgbActiveModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditFormPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
