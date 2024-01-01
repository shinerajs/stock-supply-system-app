
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/auth';
import { Supplier } from 'src/app/interfaces/supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent {

  suppliers: Supplier[] = [];
  displayAddEditModal = false;
  selectedProduct: any = null;
  subscriptions: Subscription[] = [];
  suplySubscription: Subscription = new Subscription();

  constructor(private supplierService: SupplierService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.getSupplierList();
  }

  getSupplierList() {
    this.suplySubscription = this.supplierService.getSuppliers().subscribe(
      response => {
        console.log(response);

        this.suppliers = response;
      }
    );
    this.subscriptions.push(this.suplySubscription)
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
    this.confirmationService.confirm({
      header: 'Are you sure want to delete?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.supplierService.deleteSupplier(supplier.id).subscribe(
          response => {
            this.suppliers = this.suppliers.filter(data => data.id !== supplier.id);
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Deleted Successfully!' });
          }
        )
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected!' });
      }
    });
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
