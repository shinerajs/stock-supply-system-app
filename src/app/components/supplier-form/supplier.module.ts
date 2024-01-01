import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { SupplierFormComponent } from 'src/app/components/supplier-form/supplier-form.component';
//import { AddEditProductModule } from './add-edit-product/add-edit-product.module';
import { MessageService } from 'primeng/api';
//import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { AddSupplierModule } from './add-supplier/add-supplier.module';

@NgModule({
    declarations: [
        SupplierFormComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        TableModule,
        ButtonModule,
        ToastModule,
        AddSupplierModule,
        ConfirmDialogModule
    ],
    exports: [
        SupplierFormComponent
    ],
    providers: [MessageService, ConfirmationService]
})
export class SupplierModule { }
