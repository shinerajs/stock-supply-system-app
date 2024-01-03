import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent {
  form !: FormGroup;
  tittle !: string;
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
    private dialogRef: MatDialogRef<AddSupplierComponent>
  ) {
    this.tittle = data.tittle;
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
