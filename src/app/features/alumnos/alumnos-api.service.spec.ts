import { TestBed } from '@angular/core/testing';

import { AlumnosAPIService } from './alumnos-api.service';

describe('AlumnosAPIService', () => {
  let service: AlumnosAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnosAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
