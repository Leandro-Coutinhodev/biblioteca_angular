import { TestBed } from '@angular/core/testing';

import { LivroserviceService } from './livroservice.service';

describe('LivroserviceService', () => {
  let service: LivroserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivroserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
