import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { SidebarComponent } from './views/admin/admin-layout/sidebar.component';
import { SupplierComponent } from './views/admin/supplier/supplier.component';
import { AddSupplierComponent } from './views/admin/supplier/add-supplier/add-supplier.component';
import { DeleteSupplierComponent } from './views/admin/supplier/delete-supplier/delete-supplier.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { LandingComponent } from './views/auth/landing/landing.component';
import { provideHotToastConfig } from '@ngneat/hot-toast';
import { HotToastModule } from '@ngneat/hot-toast';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewSupplierComponent } from './views/admin/supplier/view-supplier/view-supplier.component';
import { AlertComponent } from './components/alert/alert.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { ChipsInputExample } from "./components/chip/chip.component";
import { SuppliertabComponent } from './views/admin/suppliertab/suppliertab.component';
import { SupplierdetailsComponent } from './views/supplierdetails/supplierdetails.component';
import { CompanydetailsComponent } from './views/supplierdetails/companydetails/companydetails.component';
import { SupplierworksComponent } from './views/supplierdetails/supplierworks/supplierworks.component';
import { CertificatesComponent } from './views/supplierdetails/certificates/certificates.component';
import { SidemenuComponent } from './views/supplierdetails/supplier-layout/sidemenu.component';
import { AddCertificatesComponent } from './views/supplierdetails/certificates/add-certificates/add-certificates.component';
import { CustomalertComponent } from './components/customalert/customalert.component';
import { LoadingscreenComponent } from './components/loadingscreen/loadingscreen.component';
import { SidetoastnotiComponent } from './components/sidetoastnoti/sidetoastnoti.component';
import { SupplierdetailsModule } from './views/supplierdetails/supplierdetails.module';
import { AdminModule } from './views/admin/admin.module';
import { AuthModule } from './views/auth/auth.module';

//import { ChipComponent } from './components/dashboard/chip/chip.component';
//import { SidenavComponent } from './components/dashboard/sidenav/sidenav.component';
//import { NeededmoduleModule } from './shared/neededmodule/neededmodule.module';

@NgModule({
  declarations: [
    AppComponent,
    // SidebarComponent,
    // SupplierComponent,
    // AddSupplierComponent,
    // DeleteSupplierComponent,
    // ViewSupplierComponent,
    // LoginComponent,
    // RegisterComponent,
    // LandingComponent,
    LayoutComponent,
    FooterComponent,
    AlertComponent,
    // DashboardComponent,
    // SuppliertabComponent,
    // SupplierdetailsComponent,
    // CompanydetailsComponent,
    // SupplierworksComponent,
    // CertificatesComponent,
    // SidemenuComponent,
    // AddCertificatesComponent,
    CustomalertComponent,
    LoadingscreenComponent,
    SidetoastnotiComponent,
  ],
  providers: [
    provideHotToastConfig(), // @ngneat/hot-toast providers
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    AuthModule,
    SupplierdetailsModule,
    FormsModule,
    // AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    ChipsInputExample,

  ]
})
export class AppModule { }
