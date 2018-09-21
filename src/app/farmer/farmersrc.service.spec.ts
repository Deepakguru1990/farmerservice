import { TestBed } from '@angular/core/testing';

import { FarmersrcService } from './farmersrc.service';

describe('FarmersrcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FarmersrcService = TestBed.get(FarmersrcService);
    expect(service).toBeTruthy();
  });
});
