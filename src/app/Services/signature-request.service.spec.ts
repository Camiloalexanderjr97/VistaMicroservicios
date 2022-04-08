import { TestBed } from '@angular/core/testing';

import { SignatureRequestService } from './signature-request.service';

describe('SignatureRequestService', () => {
  let service: SignatureRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignatureRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
