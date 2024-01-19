import { TestBed } from '@angular/core/testing';

import { NormaluserguardGuard } from './normaluserguard.guard';

describe('NormaluserguardGuard', () => {
  let guard: NormaluserguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NormaluserguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
