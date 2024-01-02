import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
//import { SupplierService } from 'src/app/services/supplier.service';
import { MessageService } from 'primeng/api';
import { Supplier } from 'src/app/interfaces/supplier';
import { User } from 'src/app/interfaces/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent {


  @Input() displayAddEditModal: boolean = true;
  @Input() selectedProduct: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Add";

  supplierForm = this.fb.group({
    name: ["", Validators.required],
    product: ["", Validators.required],
    quantity: ["", Validators.required],
    inumber: ["", Validators.required],
    amount: ["", Validators.required]
  });
  constructor(private fb: FormBuilder,
    // private supplierService: SupplierService,
    private messageService: MessageService, private firestore: Firestore) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.selectedProduct) {
      this.modalType = 'Edit';
      this.supplierForm.patchValue(this.selectedProduct);
    } else {
      this.supplierForm.reset();
      this.modalType = 'Add';
    }
  }

  closeModal() {
    this.supplierForm.reset();
    this.clickClose.emit(true);
  }

  addSupplier() {

    const postData = { ...this.supplierForm.value };
    console.log(this.supplierForm.value);
    const collectionInstance = collection(this.firestore, 'suppliers');
    addDoc(collectionInstance, postData)
      .then(() => {
        console.log('data saved sucessfully');

        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added' });
      })
      .catch((err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        console.log('Errror occured');

      })

    // this.supplierService.saveSuppliers(postData as Supplier).subscribe(
    //   response => {

    //     this.clickAdd.emit(response);
    //     this.closeModal();
    //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added' });
    //   },
    //   error => {
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    //     console.log('Errror occured');
    //   }
    // )
  }

  editSupplier() {
    // const postData = { ...this.supplierForm.value };
    // console.log(this.supplierForm.value);

    // this.supplierService.editSupplier(this.supplierForm.value, this.selectedProduct).subscribe(
    //   response => {

    //     this.clickAddEdit.emit(response);
    //     this.closeModal();
    //     const msg = this.modalType === 'Add' ? 'Product added' : 'Product updated';
    //     this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
    //   },
    //   error => {
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    //     console.log('Errror occured');
    //   }
    // )
  }

}
