import { TestBed } from '@angular/core/testing';
import { HomeApiService } from './home-api.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('HomeApiService', () => {
  let service: HomeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting]
    });
    service = TestBed.inject(HomeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
