import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddFormUsuarioComponent } from './modal-add-form-usuario.component';

describe('ModalAddFormUsuarioComponent', () => {
  let component: ModalAddFormUsuarioComponent;
  let fixture: ComponentFixture<ModalAddFormUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddFormUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddFormUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
