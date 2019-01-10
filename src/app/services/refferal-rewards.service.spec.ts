import { TestBed } from '@angular/core/testing';

import { RefferalRewardsService } from './refferal-rewards.service';

describe('RefferalRewardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefferalRewardsService = TestBed.get(RefferalRewardsService);
    expect(service).toBeTruthy();
  });
});
