import { TestBed } from '@angular/core/testing';

import { TransServiceService } from './trans-service.service';

describe('TransServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransServiceService = TestBed.get(TransServiceService);
    expect(service).toBeTruthy();
  });
});
