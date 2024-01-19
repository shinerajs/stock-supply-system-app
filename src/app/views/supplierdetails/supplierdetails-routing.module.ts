import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanydetailsComponent } from './companydetails/companydetails.component';
import { SupplierworksComponent } from './supplierworks/supplierworks.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'company-details', component: CompanydetailsComponent
  },
  {
    path: 'supplier-works', component: SupplierworksComponent
  },
  {
    path: 'certificates', component: CertificatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierdetailsRoutingModule { }
