import { TestBed } from '@angular/core/testing';

import { TicketsRestService } from './rest.service';

describe('RestService', () => {
  let service: TicketsRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
