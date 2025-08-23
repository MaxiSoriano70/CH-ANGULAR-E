import { TestBed } from '@angular/core/testing';
import { LoginApiService } from './login-api.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('LoginApiService', () => {
  let service: LoginApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting]
    });
    service = TestBed.inject(LoginApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
