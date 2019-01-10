import { TestBed } from '@angular/core/testing';

import { BroadcastSmsService } from './broadcast-sms.service';

describe('BroadcastSmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BroadcastSmsService = TestBed.get(BroadcastSmsService);
    expect(service).toBeTruthy();
  });
});
