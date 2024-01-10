import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent {
  form !: FormGroup;
  tittle !: string;
  buttonName !: string;
  button !: string;
  id !: string;
  name !: string;
  mobile !: string;
  product !: string;
  quantity !: string;
  purdate !: Date;
  amount !: string;
  available !: string;
  radata: any;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddSupplierComponent>
  ) {
    this.radata = data;
    this.tittle = data.tittle;
    this.buttonName = data.buttonName;
    this.name = data.name;
    this.mobile = data.mobile;
    this.product = data.product;
    this.quantity = data.quantity;
    this.amount = data.amount;
    this.purdate = data.purdate;
    this.available = data.available;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id, []],
      name: [this.name, [Validators.required]],
      mobile: [this.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      product: [this.product, [Validators.required]],
      quantity: [this.quantity, [Validators.required]],
      purdate: [this.purdate, [Validators.required]],
      amount: [this.amount, [Validators.required]],
      available: [this.available, [Validators.required]]

    })
  }

  cancelAdd() {
    this.dialogRef.close();
  }

  addSupplier() {
    console.log(this.form.value, this.radata);

    this.dialogRef.close({ ...this.form.value, id: this.radata.id });
  }
}
