
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/auth';
import { Supplier } from 'src/app/interfaces/supplier';
//import { SupplierService } from 'src/app/services/supplier.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent {

  supplierData!: Observable<any>;

  suppliers: Supplier[] = [];

  displayAddEditModal = false;
  selectedProduct: any = null;
  subscriptions: Subscription[] = [];
  suplySubscription: Subscription = new Subscription();

  constructor(
    // private supplierData: SupplierService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private firestore: Firestore) {


    this.getSupplierList();
  }

  getSupplierList() {
    const collectionInstance = collection(this.firestore, 'suppliers');
    collectionData(collectionInstance).subscribe(res => {
      console.log(res);

    })
    this.supplierData = collectionData(collectionInstance);
    console.log(this.supplierData);

    // this.supplierData.getSuppliers().subscribe(res => {

    //   this.suppliers = res.map((e: any) => {
    //     const data = e.payload.doc.data();
    //     data.id = e.payload.doc.id;
    //     return data;
    //   })
    // }, err => {
    //   alert('Error while fetching supplier data');
    // })



    // this.suplySubscription = this.supplierService.getSuppliers().subscribe(
    //   response => {
    //     console.log(response);

    //     this.suppliers = response;
    //   }
    // );
    // this.subscriptions.push(this.suplySubscription)
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  // saveSupplierToList(newData: any) {
  //   this.suppliers.unshift(newData);
  // }
  saveorUpdateProductList(newData: any) {
    if (this.selectedProduct && newData.id === this.selectedProduct.id) {
      const productIndex = this.suppliers.findIndex(data => data.id === newData.id);
      this.suppliers[productIndex] = newData;
    } else {
      this.suppliers.unshift(newData);
    }

    //this.getProductList();
  }

  showEditModal(supplier: Supplier) {
    console.log(supplier);

    this.displayAddEditModal = true;
    this.selectedProduct = supplier;
  }

  // deleteSupplier(supplier: Supplier) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to delete this list?',
  //     accept: () => {
  //       this.supplierService.deleteSupplier(supplier.id).subscribe(
  //         response => {
  //           this.suppliers = this.suppliers.filter(data => data.id !== supplier.id);
  //           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully!' });
  //         },
  //         error => {
  //           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong!' });
  //         }
  //       )
  //     }
  //   })
  // }


  deleteSupplier(supplier: Supplier) {
    // this.confirmationService.confirm({
    //   header: 'Are you sure want to delete' + supplier.name + '?',
    //   message: 'Please confirm to proceed.',
    //   accept: () => {
    //     this.supplierData.deleteSupplier(supplier);
    //     this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Deleted Successfully!' });

    //   },
    //   reject: () => {
    //     this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected!' });
    //   }
    // });

    // this.confirmationService.confirm({
    //   header: 'Are you sure want to delete?',
    //   message: 'Please confirm to proceed.',
    //   accept: () => {
    //     this.supplierService.deleteSupplier(supplier.id).subscribe(
    //       response => {
    //         this.suppliers = this.suppliers.filter(data => data.id !== supplier.id);
    //         this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Deleted Successfully!' });
    //       }
    //     )
    //   },
    //   reject: () => {
    //     this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected!' });
    //   }
    // });
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
