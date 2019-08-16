import { TestBed, async, inject } from '@angular/core/testing';

import { AvailableAssetGuard } from './available-asset.guard';

describe('AvailableAssetGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailableAssetGuard]
    });
  });

  it('should ...', inject([AvailableAssetGuard], (guard: AvailableAssetGuard) => {
    expect(guard).toBeTruthy();
  }));
});
