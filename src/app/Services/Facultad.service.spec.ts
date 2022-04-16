import { FacultadService } from './Facultad.service';
import { TestBed } from '@angular/core/testing';


describe('FacultadService', () => {
  let service: FacultadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
