import { TestBed } from '@angular/core/testing';

import { FacultyFunService } from './faculty-fun.service';

describe('FacultyFunService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacultyFunService = TestBed.get(FacultyFunService);
    expect(service).toBeTruthy();
  });
});
