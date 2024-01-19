import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSupplierComponent } from '../supplier/add-supplier/add-supplier.component';
import { DataService } from 'src/app/shared/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotToastService } from '@ngneat/hot-toast';
import { AlertComponent } from '../../../components/alert/alert.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    public dialog: MatDialog,
    private supplierService: DataService,
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private _snackBar: MatSnackBar
  ) { }

  addSupplier() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tittle: 'Invite Supplier',
      buttonName: 'Invite'
    }
    const dialogRef = this.dialog.open(AddSupplierComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(this.toast.observe({
        success: 'Successfully Invited',
        loading: 'Inviting...',
        error: 'Please Check the entered details.',
      }))
      .subscribe(data => {
        if (data) {
          console.log(data);
          this.supplierService.addSupplier(data);
          // this.openSnackBar("Successfully Invited.", "OK");

        }
      })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
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

    dialogRef.afterClosed()
      .pipe(this.toast.observe({
        success: 'Successfully LogOut',
        loading: 'Logging out...',
        error: 'Please Check the entered details.',
      }))
      .subscribe(data => {
        if (data) {
          // this.supplierService.deleteSupplier(row);
          // console.log(row);
          this.authService.logout().subscribe(() => {
            localStorage.clear();
            this.router.navigate(['/loginuser']);
            location.reload();
          });

          // this.openSnackBar("LogOut Successfully!", "OK")
        }
      })

  }
}
