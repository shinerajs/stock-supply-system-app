import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
//import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { MaterialModule } from './material/material.module';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { SupplierComponent } from './components/dashboard/supplier/supplier.component';
import { AddSupplierComponent } from './components/dashboard/supplier/add-supplier/add-supplier.component';
import { DeleteSupplierComponent } from './components/dashboard/supplier/delete-supplier/delete-supplier.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { provideHotToastConfig } from '@ngneat/hot-toast';
import { HotToastModule } from '@ngneat/hot-toast';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewSupplierComponent } from './components/dashboard/supplier/view-supplier/view-supplier.component';
import { AlertComponent } from './components/dashboard/alert/alert.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ChipsInputExample } from "./components/dashboard/chip/chip.component";
import { SuppliertabComponent } from './components/dashboard/suppliertab/suppliertab.component';
import { SupplierdetailsComponent } from './components/supplierdetails/supplierdetails.component';
import { CompanydetailsComponent } from './components/supplierdetails/companydetails/companydetails.component';
import { SupplierworksComponent } from './components/supplierdetails/supplierworks/supplierworks.component';
import { CertificatesComponent } from './components/supplierdetails/certificates/certificates.component';
import { SidemenuComponent } from './components/supplierdetails/sidemenu/sidemenu.component';
import { AddCertificatesComponent } from './components/supplierdetails/certificates/add-certificates/add-certificates.component';
import { SidetoastComponent } from './components/sidetoast/sidetoast.component';
import { CustomalertComponent } from './components/customalert/customalert.component';
//import { ChipComponent } from './components/dashboard/chip/chip.component';
//import { SidenavComponent } from './components/dashboard/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SupplierComponent,
    AddSupplierComponent,
    DeleteSupplierComponent,
    LandingComponent,
    LayoutComponent,
    FooterComponent,
    ViewSupplierComponent,
    AlertComponent,
    DashboardComponent,
    SuppliertabComponent,
    SupplierdetailsComponent,
    CompanydetailsComponent,
    SupplierworksComponent,
    CertificatesComponent,
    SidemenuComponent,
    AddCertificatesComponent,
    SidetoastComponent,
    CustomalertComponent,
  ],
  providers: [
    provideHotToastConfig(), // @ngneat/hot-toast providers
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    // AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    ChipsInputExample
  ]
})
export class AppModule { }
