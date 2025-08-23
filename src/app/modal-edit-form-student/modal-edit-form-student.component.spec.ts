import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalEditFormStudentComponent } from './modal-edit-form-student.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { tipoUser } from '../../shared/tipoUser';

describe('ModalEditFormStudentComponent', () => {
  let component: ModalEditFormStudentComponent;
  let fixture: ComponentFixture<ModalEditFormStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditFormStudentComponent],
      providers: [NgbActiveModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditFormStudentComponent);
    component = fixture.componentInstance;

    component.student = {
      id: "5",
      name: 'Sofia',
      surname: 'Diaz',
      age: 23,
      dni: 38123456,
      average: 9.1,
      email: "sofia.diaz@gmail.com",
      password: "Sofia-123",
      role: tipoUser.USER
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
