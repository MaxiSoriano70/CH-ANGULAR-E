import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalEditFormUsuarioComponent } from './modal-edit-form-usuario.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ModalEditFormUsuarioComponent', () => {
  let component: ModalEditFormUsuarioComponent;
  let fixture: ComponentFixture<ModalEditFormUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditFormUsuarioComponent],
      providers: [NgbActiveModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditFormUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
