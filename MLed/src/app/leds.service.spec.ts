import { TestBed } from '@angular/core/testing';

import { LedsService } from './leds.service';

describe('LedsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LedsService = TestBed.get(LedsService);
    expect(service).toBeTruthy();
  });
});
