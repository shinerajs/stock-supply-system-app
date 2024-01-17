import { Component, Input, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users } from 'src/app/shared/interface/user';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { getAuth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() uid: string = '';
  currentuser: Users = {};
  constructor(
    private firestoreService: FirestoreService, private router: Router,
    private snackbar: SnackbarService,
  ) { }

  ngOnInit(): void {
  }
  ngOnChanges() {
    if (this.uid) {
      this.getProfileDetails();
    }
  }
  async getProfileDetails() {
    await this.firestoreService.getDocumentByIDFrom('users-list', this.uid).then((resp: Users) => {
      this.currentuser.displayName = resp.displayName;
      this.currentuser.photoURL = resp.photoURL;
      this.currentuser.role = resp.role;
    })
  }
  navigate() {
    if (this.currentuser.role === 'Premium User') {
      this.router.navigateByUrl('/premium/profile');
    }
    else if (this.currentuser.role === 'Architect') {
      this.router.navigateByUrl('/architect/profile');
    }
    else {
      this.router.navigateByUrl('/profile');
    }

  }

  logOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.router.navigateByUrl('/auth');
      // Sign-out successful.

    }).catch((error) => {
      // An error happened.
      this.snackbar.openSnackBar('Logout Failed', 'Try Again');
    });
  }





  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  user$ = this.currentuser.uid;

  // constructor(
  //   private authService: AuthService,
  //   public dialog: MatDialog,
  //   private _snackBar: MatSnackBar,
  //   public usersService: UsersService,
  //   private router: Router
  // ) { }
  // user$ = this.usersService.currentUserProfile$;

  // logOut() {
  //   // this.authService.logout().subscribe(async user => {
  //   //   if (user) {
  //   //     localStorage.clear();
  //   //     await this.router.navigate(['/loginuser']);
  //   //     location.reload();
  //   //   }
  //   // })

  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.data = {
  //     tittle: 'Alert!',
  //     action: 'LogOut'
  //   }
  //   const dialogRef = this.dialog.open(AlertComponent, dialogConfig);

  //   dialogRef.afterClosed().subscribe(data => {
  //     if (data) {
  //       // this.supplierService.deleteSupplier(row);
  //       // console.log(row);
  //       this.authService.logout().subscribe(() => {
  //         localStorage.clear();
  //         this.router.navigate(['/loginuser']);
  //         location.reload();
  //       });

  //       this.openSnackBar("Supplier deleted Successfully!", "OK")
  //     }
  //   })

  // }

  // openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message, action);
  // }
}
