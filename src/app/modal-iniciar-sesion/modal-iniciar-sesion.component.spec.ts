import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIniciarSesionComponent } from './modal-iniciar-sesion.component';

describe('ModalIniciarSesionComponent', () => {
  let component: ModalIniciarSesionComponent;
  let fixture: ComponentFixture<ModalIniciarSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalIniciarSesionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalIniciarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
