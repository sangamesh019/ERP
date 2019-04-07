import { TestBed } from '@angular/core/testing';

import { CanactiveFacultyService } from './canactive-faculty.service';

describe('CanactiveFacultyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanactiveFacultyService = TestBed.get(CanactiveFacultyService);
    expect(service).toBeTruthy();
  });
});
