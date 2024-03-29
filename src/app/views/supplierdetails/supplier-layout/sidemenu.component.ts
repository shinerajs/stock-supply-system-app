import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from '../../../components/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {
  currentuid: any = '';
  businessID: any = '';
  isBusinessOpened = false;

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  user$ = this.usersService.currentUserProfile$;
  ngOnInit(): void {
    this.getCurrentUser();

    this.route.queryParams.subscribe(qp => {

      this.businessID = qp['businessid'];
      if (this.businessID) {
        this.isBusinessOpened = true;
      }
      else {
        this.isBusinessOpened = false;
      }
    })
  }

  async getCurrentUser() {
    await this.usersService.getUserDetails().then(async (res: any) => {

      this.currentuid = res.uid;
    })
  }


  logOut() {
    // this.authService.logout().subscribe(async user => {
    //   if (user) {
    //     localStorage.clear();
    //     await this.router.navigate(['/loginuser']);
    //     location.reload();
    //   }
    // })

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tittle: 'Alert!',
      action: 'LogOut'
    }
    const dialogRef = this.dialog.open(AlertComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        // this.supplierService.deleteSupplier(row);
        // console.log(row);
        this.authService.logout().subscribe(() => {
          localStorage.clear();
          this.router.navigate(['/loginuser']);
          location.reload();
        });

        this.openSnackBar("Supplier deleted Successfully!", "OK")
      }
    })



  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
