import { TestBed } from '@angular/core/testing';

import { CompeleteMomsService } from './compelete-moms.service';

describe('CompeleteMomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompeleteMomsService = TestBed.get(CompeleteMomsService);
    expect(service).toBeTruthy();
  });
});
