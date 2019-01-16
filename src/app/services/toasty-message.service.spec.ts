import { TestBed } from '@angular/core/testing';

import { ToastyMessageService } from './toasty-message.service';

describe('ToastyMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastyMessageService = TestBed.get(ToastyMessageService);
    expect(service).toBeTruthy();
  });
});
