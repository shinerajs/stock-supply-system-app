import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, RoutesRecognized, UrlTree } from '@angular/router';
import { filter, Observable, pairwise } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { MainUser } from 'src/app/shared/interface/mainuser';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivateChild {
  currentUID: any = '';
  user: MainUser = new MainUser();
  userrole: any = "";
  constructor(private firestoreService: FirestoreService,
    private router: Router) { }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserRole(next, url, state);

  }
  async checkUserRole(route: ActivatedRouteSnapshot, url: any, state: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await this.firestoreService.getAuthUserProfile().then((res: any) => {
        if (res && res.role) {
          if (res.role === 'Admin') {
            resolve(true);
          }
          else {
            if (res.role === 'New User' || res.role === 'Supplier' || res.role === 'Sub Contractor') {
              this.router.navigateByUrl('/commondashboard');
            }
            else {
              this.router.navigateByUrl((res.role).toLowerCase());
            }

            resolve(false);
          }
        }
        else {

          this.router.navigateByUrl('/commondashboard');
          resolve(false);
        }

      })
    })

  }

}
