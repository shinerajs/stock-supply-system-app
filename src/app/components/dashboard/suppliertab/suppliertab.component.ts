import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSupplierComponent } from '../supplier/add-supplier/add-supplier.component';
import { DataService } from 'src/app/shared/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-suppliertab',
  templateUrl: './suppliertab.component.html',
  styleUrls: ['./suppliertab.component.scss']
})
export class SuppliertabComponent {
  constructor(
    public dialog: MatDialog,
    private supplierService: DataService,
    private _snackBar: MatSnackBar
  ) { }

  addSupplier() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tittle: 'Add Supplier',
      buttonName: 'Add'
    }
    const dialogRef = this.dialog.open(AddSupplierComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data);
        this.supplierService.addSupplier(data);
        this.openSnackBar("Successfully added.", "OK")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}

