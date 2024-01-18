import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSupplierComponent } from '../supplier/add-supplier/add-supplier.component';
import { DataService } from 'src/app/shared/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-suppliertab',
  templateUrl: './suppliertab.component.html',
  styleUrls: ['./suppliertab.component.scss']
})
export class SuppliertabComponent {
  constructor(
    public dialog: MatDialog,
    private supplierService: DataService,
    private toast:HotToastService
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
    .pipe( this.toast.observe({
      loading: 'Inviting Supplier...',
      success: 'Successfully Invited',
      error: 'There was an error in inviting the Supplier',
    }))
    .subscribe(data => {
      if (data) {
        console.log(data);
        this.supplierService.addSupplier(data);
      }
    })
  }


}

