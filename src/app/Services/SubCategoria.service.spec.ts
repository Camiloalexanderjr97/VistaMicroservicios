import { TestBed } from '@angular/core/testing';

import { SubCategoriaService } from './SubCategoria.service';

describe('SubCategoriaService', () => {
  let service: SubCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
