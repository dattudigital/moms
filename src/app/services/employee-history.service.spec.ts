import { TestBed } from '@angular/core/testing';

import { EmployeeHistoryService } from './employee-history.service';

describe('EmployeeHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeHistoryService = TestBed.get(EmployeeHistoryService);
    expect(service).toBeTruthy();
  });
});
