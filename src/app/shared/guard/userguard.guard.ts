import { CanActivateChildFn } from '@angular/router';

export const userguardGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
