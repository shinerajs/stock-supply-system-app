import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/services/data.service';
import { UsersService } from 'src/app/shared/services/users.service';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent {
  user$ = this.usersService.currentUserProfile$;
  form !: FormGroup;
  uid!: string;
  tittle !: string;
  buttonName !: string;
  button !: string;
  id !: string;
  displayName !: string;
  email !: string;
  password !: any;
  companyname !: string;
  mobile !: string;
  role !: string;
  period !: string;
  supervisoremail !: string;
  product !: string;
  quantity !: string;
  amount !: string;
  status !: string;
  comments !: string;
  certificates !: string[];
  radata: any;

  roles: string[] = ['Supplier', 'Subcontractor', 'Admin'];
  periods: string[] = ['Four months', 'Six months', 'One Year'];
  statuses: string[] = ['Invited', 'On Review', 'Approved', 'Expired']

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dataService: DataService,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<AddSupplierComponent>
  ) {
    this.radata = data;
    this.tittle = data.tittle;
    this.buttonName = data.buttonName;
    this.displayName = data.displayName;
    this.companyname = data.companyname;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.supervisoremail = data.supervisoremail;
    this.period = data.period;
    this.mobile = data.mobile;
    this.product = data.product;
    this.quantity = data.quantity;
    this.amount = data.amount;
    this.status = data.status;
    this.comments = data.comments;
    this.certificates = data.certificates;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id, []],
      displayName: [this.displayName, [Validators.required]],
      mobile: [this.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      companyname: [this.companyname, [Validators.required]],
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, [Validators.required]],
      role: [this.role, [Validators.required]],
      supervisoremail: [this.supervisoremail, [Validators.required, Validators.email]],
      period: [this.period, [Validators.required]],
      product: [this.product, [Validators.required]],
      quantity: [this.quantity, [Validators.required]],
      amount: [this.amount, [Validators.required]],
      status: [this.status, [Validators.required]],
      comments: [this.comments],
      certificates: [this.fruits, [Validators.required]]

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
      console.log(this.fruits);

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
