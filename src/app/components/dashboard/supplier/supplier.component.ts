import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { DataService } from 'src/app/shared/services/data.service';
import { Supplier } from 'src/app/shared/interface/supplier';
import { DeleteSupplierComponent } from './delete-supplier/delete-supplier.component';
import { ViewSupplierComponent } from './view-supplier/view-supplier.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent {

  suppliersArr: Supplier[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'product', 'quantity', 'amount', 'available', 'action'];
  dataSource!: MatTableDataSource<Supplier>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private supplierService: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllSuppliers();

  }

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

  getAllSuppliers() {
    this.supplierService.getSupplier().subscribe(suppliersArr => {
      this.suppliersArr = suppliersArr;
      console.log(this.suppliersArr);

      this.dataSource = new MatTableDataSource(this.suppliersArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })

  }

  viewSupplier(row: any) {
    // window.open('/view_supplier/' + row.patient_id, '_blank');

    if (row.id == null || row.name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    // dialogConfig.data.tittle = "View Supplier",
    // dialogConfig.data.buttonName = 'Update';
    //dialogConfig.data.purdate = row.purdate.toDate();

    console.log(dialogConfig.data);

    const dialogRef = this.dialog.open(ViewSupplierComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      if (data) {
        this.supplierService.getSupplierById(data);
        console.log(data);

        // this.openSnackBar("Supplier is updated successfully.", "OK")
      }
    })
  }

  editSupplier(row: any) {
    if (row.id == null || row.name == null) {
      return;

    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.tittle = "Edit Supplier",
      dialogConfig.data.buttonName = 'Update';

    console.log(dialogConfig.data);

    const dialogRef = this.dialog.open(AddSupplierComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      if (data) {
        this.supplierService.updateSupplier(data);
        console.log(data);

        this.openSnackBar("Supplier is updated successfully.", "OK")
      }
    })
  }

  async deleteSupplier(row: Supplier) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tittle: 'Delete Supplier',
      supplierName: row.name
    }

    const dialogRef = this.dialog.open(DeleteSupplierComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.supplierService.deleteSupplier(row);
        console.log(row);

        this.openSnackBar("Supplier deleted Successfully!", "OK")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getProductStatus(row: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    if (row) {
      if (row == 'active') {
        return {
          color: "accent",
          status: `Active`
        };
      } else
        return {
          color: "primary",
          status: `Deleted`
        };
    } else
      return {
        color: "warn",
        status: `Inactive`
      };
  }
}

