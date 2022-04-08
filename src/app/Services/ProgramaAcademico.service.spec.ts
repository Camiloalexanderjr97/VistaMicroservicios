import { ProgramaAcademico } from './../Modelos/ProgramaAcademico';
import { TestBed } from '@angular/core/testing';


describe('ProgramaAcademico', () => {
  let service: ProgramaAcademico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramaAcademico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
