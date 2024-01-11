import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/services/data.service';

export interface Fruit {
  name: string;
}

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
  email !: string;
  companyname !: string;
  mobile !: string;
  contractor !: string;
  period !: string;
  supervisoremail !: string;
  product !: string;
  quantity !: string;
  amount !: string;
  available !: string;
  comments !: string;
  certificates !: string[];
  radata: any;

  contractors: string[] = ['Subcontractor', 'Supplier', 'Consultant', 'Operated Plant', 'Others'];
  periods: string[] = ['Four months', 'Six months', 'One Year'];

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
    this.companyname = data.companyname;
    this.email = data.email;
    this.contractor = data.contractor;
    this.supervisoremail = data.supervisoremail;
    this.period = data.period;
    this.mobile = data.mobile;
    this.product = data.product;
    this.quantity = data.quantity;
    this.amount = data.amount;
    this.available = data.available;
    this.comments = data.comments;
    this.certificates = data.certificates;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id, []],
      name: [this.name, [Validators.required]],
      mobile: [this.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      companyname: [this.companyname, [Validators.required]],
      email: [this.email, [Validators.required, Validators.email]],
      contractor: [this.contractor, [Validators.required]],
      supervisoremail: [this.supervisoremail, [Validators.required, Validators.email]],
      period: [this.period, [Validators.required]],
      product: [this.product, [Validators.required]],
      quantity: [this.quantity, [Validators.required]],
      amount: [this.amount, [Validators.required]],
      available: [this.available, [Validators.required]],
      comments: [this.comments],
      certificates: this.fruits

    })
  }

  cancelAdd() {
    this.dialogRef.close();
  }

  addSupplier() {

    console.log(this.form.value, this.radata);

    this.dialogRef.close({ ...this.form.value, id: this.radata.id });
  }

  //chip component

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }

}
