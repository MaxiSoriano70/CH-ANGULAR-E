import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrosSponsorsComponent } from './nuestros-sponsors.component';

describe('NuestrosSponsorsComponent', () => {
  let component: NuestrosSponsorsComponent;
  let fixture: ComponentFixture<NuestrosSponsorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuestrosSponsorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuestrosSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
