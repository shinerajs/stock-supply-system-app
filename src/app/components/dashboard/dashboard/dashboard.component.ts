import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSupplierComponent } from '../supplier/add-supplier/add-supplier.component';
import { DataService } from 'src/app/shared/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    public dialog: MatDialog,
    private supplierService: DataService,
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
        // error: ({ no }) => `There was an error: ${message} `,
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

}
