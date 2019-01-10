import { TestBed } from '@angular/core/testing';

import { TestmonialsService } from "./TestmonialsService";

describe('TestmonialsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestmonialsService = TestBed.get(TestmonialsService);
    expect(service).toBeTruthy();
  });
});
