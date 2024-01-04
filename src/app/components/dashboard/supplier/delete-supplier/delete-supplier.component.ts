import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.scss']
})
export class DeleteSupplierComponent {
   supplierName !: string;
   tittle !: string;

   constructor (
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef <DeleteSupplierComponent>
   ) {
    this.supplierName = data.supplierName;
    this.tittle = data.tittle;
   }

   close() {
    this.dialogRef.close();
  }

  delete() {
    const deleteSupplier = true;
    this.dialogRef.close(deleteSupplier);
  }
}

