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

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SupplierComponent,
    AddSupplierComponent,
    DeleteSupplierComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent
  ],
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
    HotToastModule.forRoot()
  ],
  providers: [
    provideHotToastConfig(), // @ngneat/hot-toast providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
