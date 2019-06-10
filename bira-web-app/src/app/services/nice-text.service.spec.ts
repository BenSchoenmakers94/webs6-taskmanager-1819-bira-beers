import { TestBed } from '@angular/core/testing';

import { NiceTextService } from './nice-text.service';

describe('NiceTextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NiceTextService = TestBed.get(NiceTextService);
    expect(service).toBeTruthy();
  });
});
