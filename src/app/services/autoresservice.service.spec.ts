import { TestBed } from '@angular/core/testing';

import { AutoresserviceService } from './autoresservice.service';

describe('AutoresserviceService', () => {
  let service: AutoresserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoresserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
