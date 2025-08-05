import { TestBed } from '@angular/core/testing';

import { CursosAPIService } from './cursos-api.service';

describe('CursosAPIService', () => {
  let service: CursosAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
