import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-companydetails',
  templateUrl: './companydetails.component.html',
  styleUrls: ['./companydetails.component.scss']
})


export class CompanydetailsComponent {
  form !: FormGroup;
  id !: string;
  companyname !: string;
  regaddress !: string;
  tradeaddress !: string;
  town !: string;
  country !: string;
  postcode !: string;
  mobile !: string;
  email !: string;
  supervisoremail !: string;
  accountnumber !: string;
  ifsccode !: string;
  status !: string;
  vatnumber !: string;
  companyregnum !: string;
  name !: string;
  position !: string;
  contactnum !: string;

  constructor(
    private fb: FormBuilder,
    //@Inject(MAT_DIALOG_DATA) data: any,
    private dataService: DataService,
    private _snackBar: MatSnackBar
    //private dialogRef: MatDialogRef<AddSupplierComponent>
  ) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id, []],
      companyname: [this.companyname, [Validators.required]],
      regaddress: [this.regaddress, [Validators.required]],
      tradeaddress: [this.tradeaddress, [Validators.required]],
      town: [this.town, [Validators.required]],
      country: [this.country, [Validators.required]],
      postcode: [this.postcode, [Validators.required]],
      mobile: [this.mobile, [Validators.required]],
      email: [this.email, [Validators.required]],
      supervisoremail: [this.supervisoremail, [Validators.required]],
      accountnumber: [this.accountnumber, [Validators.required]],
      ifsccode: [this.ifsccode, [Validators.required]],
      status: [this.status, [Validators.required]],
      vatnumber: [this.vatnumber, [Validators.required]],
      companyregnum: [this.companyregnum, [Validators.required]],
      name: [this.name, [Validators.required]],
      position: [this.position, [Validators.required]],
      contactnum: [this.contactnum, [Validators.required]],
    })
  }

  saveDetails() {
    console.log(this.form.value);
    this.dataService.addSupplierDetails(this.form.value);
    this.openSnackBar("Successfully added.", "OK")
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
