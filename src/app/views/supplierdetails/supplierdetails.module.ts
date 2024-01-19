import { SupplierdetailsRoutingModule } from './supplierdetails-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HotToastModule } from '@ngneat/hot-toast';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CompanydetailsComponent } from './companydetails/companydetails.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidemenuComponent } from './supplier-layout/sidemenu.component';
import { AddCertificatesComponent } from './certificates/add-certificates/add-certificates.component';



@NgModule({
  declarations: [
    CompanydetailsComponent,
    CertificatesComponent,
    DashboardComponent,
    SidemenuComponent,
    AddCertificatesComponent
  ],
  imports: [
    CommonModule,
    HotToastModule,
    MatRippleModule,
    MatCardModule,
    MatSidenavModule,
    MatRadioModule,
    MatListModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    LayoutModule,
    MatTooltipModule,
    MatTableModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTabsModule,
    MatChipsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatMenuModule,
    MatPaginatorModule,
    SupplierdetailsRoutingModule,
    MatToolbarModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    // BrowserModule,
    // BrowserAnimationsModule,
    HttpClientModule,
  ],
  exports: [
    CompanydetailsComponent,
    CertificatesComponent,
    DashboardComponent,
    SidemenuComponent,
    AddCertificatesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SupplierdetailsModule { }
