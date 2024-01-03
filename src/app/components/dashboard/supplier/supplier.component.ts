import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { DataService } from 'src/app/shared/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Supplier } from 'src/app/shared/interface/supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent {

  suppliersArr: Supplier[] = [];

  constructor(
    public dialog: MatDialog,
    private dataApi: DataService,
    private _snackBar: MatSnackBar
  ) { }

  addSupplier() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tittle: 'Register Supplier'
    }
    const dialogRef = this.dialog.open(AddSupplierComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data);
        this.dataApi.addSupplier(data);
        this.openSnackBar("Successfully added.", "OK")
      }
    })
  }

  getAllSuppliers() {
    this.dataApi.getSupplier().subscribe(res => {
      this.suppliersArr = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
      console.log(this.suppliersArr);
    })


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
