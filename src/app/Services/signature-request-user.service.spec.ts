import { TestBed } from '@angular/core/testing';

import { SignatureRequestUserService } from './signature-request-user.service';

describe('SignatureRequestUserService', () => {
  let service: SignatureRequestUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignatureRequestUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
