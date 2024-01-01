import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddSupplierComponent } from 'src/app/components/supplier-form/add-supplier/add-supplier.component';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
    declarations: [
        AddSupplierComponent
    ],
    imports: [
        CommonModule,
        DialogModule,
        BrowserAnimationsModule,
        ButtonModule,
        ReactiveFormsModule,
        InputTextModule,
        InputNumberModule,
        InputTextareaModule,
        CalendarModule
    ],
    exports: [AddSupplierComponent]
})
export class AddSupplierModule { }
