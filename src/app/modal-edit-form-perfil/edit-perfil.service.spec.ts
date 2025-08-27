import { TestBed } from '@angular/core/testing';

import { EditPerfilService } from './edit-perfil.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('EditPerfilService', () => {
  let service: EditPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting]
    });
    service = TestBed.inject(EditPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
