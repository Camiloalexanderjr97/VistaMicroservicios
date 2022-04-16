
import { SemilleroService } from './semillero.service';
import { TestBed } from '@angular/core/testing';

describe('SemilleroService', () => {
  let service: SemilleroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemilleroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
