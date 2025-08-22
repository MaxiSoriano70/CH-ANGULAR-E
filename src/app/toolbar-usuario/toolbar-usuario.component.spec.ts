import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarUsuarioComponent } from './toolbar-usuario.component';

describe('ToolbarUsuarioComponent', () => {
  let component: ToolbarUsuarioComponent;
  let fixture: ComponentFixture<ToolbarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
