import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
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

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) {
    this.tittle = data.tittle;
    this.buttonName = data.buttonName;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', []],
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      product: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      purdate: ['', [Validators.required]],
      amount: ['', [Validators.required]]

    })
  }

  cancelAdd() {
    this.dialogRef.close();
  }

  addSupplier() {
    this.dialogRef.close(this.form.value);
  }
}

