import { TestBed } from '@angular/core/testing';

import { WarcraftlogsService } from './warcraftlogs.service';

describe('WarcraftlogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WarcraftlogsService = TestBed.get(WarcraftlogsService);
    expect(service).toBeTruthy();
  });
});
