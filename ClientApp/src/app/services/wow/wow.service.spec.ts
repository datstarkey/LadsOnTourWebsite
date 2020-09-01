import { TestBed } from '@angular/core/testing';

import { WowService } from './wow.service';

describe('WowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WowService = TestBed.get(WowService);
    expect(service).toBeTruthy();
  });
});
