import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { userguardGuard } from './userguard.guard';

describe('userguardGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
