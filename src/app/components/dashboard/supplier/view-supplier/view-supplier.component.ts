import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.scss']
})
export class ViewSupplierComponent {
  supplier_id !: any;
  supplier_Obj !: any;

  tittle !: string;
  buttonName !: string;
  button !: string;
  id !: any;
  name !: string;
  mobile !: string;
  product !: string;
  quantity !: string;
  amount !: string;
  available !: string;
  comments !: string;
  radata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ViewSupplierComponent>
  ) {

    this.radata = data;
    this.id = data.id;
    this.tittle = data.tittle;
    this.buttonName = data.buttonName;
    this.name = data.name;
    this.mobile = data.mobile;
    this.product = data.product;
    this.quantity = data.quantity;
    this.amount = data.amount;
    this.available = data.available;
    this.comments = data.comments
  }

  ngOnInit(): void {
    // this.getSupplierById();
  }


  // getSupplierById() {
  //   this.supplierService.getSupplierById(this.id).subscribe(res => {
  //     this.supplier_Obj = res;
  //     //this.patientObj.admission_date = this.patientObj.admission_date.toDate();
  //     console.log(res);
  //   })
  // }

  close() {
    this.dialogRef.close();
  }

}
