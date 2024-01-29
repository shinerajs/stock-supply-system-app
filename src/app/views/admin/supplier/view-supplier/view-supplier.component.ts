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
  displayName !: string;
  mobile !: string;
  product !: string;
  quantity !: string;
  amount !: string;
  available !: string;
  comments !: string;
  companyname !: string;
  regaddress !: string;
  tradeaddress !: string;
  town !: string;
  country !: string;
  postcode !: string;
  email !: string;
  supervisoremail !: string;
  accountnumber !: string;
  ifsccode !: string;
  status !: string;
  vatnumber !: string;
  companyregnum !: string;
  position !: string;
  contactnum !: string;
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
    this.displayName = data.displayName;
    this.mobile = data.mobile;
    this.product = data.product;
    this.quantity = data.quantity;
    this.amount = data.amount;
    this.available = data.available;
    this.comments = data.comments;
    this.companyname = data.companyname;
    this.regaddress = data.regaddress;
    this.tradeaddress = data.tradeaddress;
    this.town = data.town;
    this.country = data.country;
    this.postcode = data.postcode;
    this.email = data.email;
    this.supervisoremail = data.supervisoremail;
    this.accountnumber = data.accountnumber;
    this.ifsccode = data.ifsccode;
    this.status = data.status;
    this.vatnumber = data.vatnumber;
    this.companyregnum = data.companyregnum;
    this.position = data.position;
    this.contactnum = data.contactnum;

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
