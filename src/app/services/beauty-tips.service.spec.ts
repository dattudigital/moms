import { TestBed } from '@angular/core/testing';

import { BeautyTipsService } from './beauty-tips.service';

describe('BeautyTipsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeautyTipsService = TestBed.get(BeautyTipsService);
    expect(service).toBeTruthy();
  });
});
