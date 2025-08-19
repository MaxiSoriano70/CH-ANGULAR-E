import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalEditFormCourseComponent } from './modal-edit-form-course.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ModalEditFormCourseComponent', () => {
  let component: ModalEditFormCourseComponent;
  let fixture: ComponentFixture<ModalEditFormCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditFormCourseComponent],
      providers: [NgbActiveModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditFormCourseComponent);
    component = fixture.componentInstance;

    component.course = {
      id: 1,
      name: 'Test Course',
      code: 'C001',
      credits: 3
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
