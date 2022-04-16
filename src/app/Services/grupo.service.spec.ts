import { GrupoService } from './grupo.service';
import { TestBed } from '@angular/core/testing';

describe('GrupoService', () => {
  let service: GrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
