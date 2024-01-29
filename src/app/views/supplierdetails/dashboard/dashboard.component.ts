import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor (
    private authService: AuthService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: HotToastService
  ) {}
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
        this.authService.logout()
          .pipe(this.toast.observe({
            success: 'Successfully LogOut',
            loading: 'Logging out...',
            error: 'Please Check the entered details.',
          }))
          .subscribe(() => {
            localStorage.clear();
            this.router.navigate(['/loginuser']);
            location.reload();
          });

        // this.openSnackBar("Supplier deleted Successfully!", "OK")
      }
    })
  }
}
