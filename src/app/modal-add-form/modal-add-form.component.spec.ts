import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddFormComponent } from './modal-add-form.component';

describe('ModalAddFormComponent', () => {
  let component: ModalAddFormComponent;
  let fixture: ComponentFixture<ModalAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
