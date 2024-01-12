import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from './components/dashboard/supplier/supplier.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { SuppliertabComponent } from './components/dashboard/suppliertab/suppliertab.component';
import { CompanydetailsComponent } from './components/supplierdetails/companydetails/companydetails.component';
import { SupplierworksComponent } from './components/supplierdetails/supplierworks/supplierworks.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['loginuser']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: 'loginuser', component: LandingComponent, ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'register', component: RegisterComponent, ...canActivate(redirectLoggedInToHome)
  },
  {
    path: '', pathMatch: 'full', component: DashboardComponent, ...canActivate(redirectUnauthorizedToLogin)
  },
  // {
  //   path: 'supplier', component: SupplierComponent, ...canActivate(redirectUnauthorizedToLogin)
  // },
  {
    path: 'dashboard', component: DashboardComponent, ...canActivate(redirectUnauthorizedToLogin)
  },

  {
    path: 'dashboard',
    children: [
      {
        path: 'suppliertab', component: SuppliertabComponent
      },
      {
        path: 'company-details', component: CompanydetailsComponent
      },
      {
        path: 'supplier-works', component: SupplierworksComponent
      }
    ], ...canActivate(redirectUnauthorizedToLogin)
  },

  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   canActivate: [authGuard]
  // },
  // {
  //   path: '', redirectTo: 'home', pathMatch: 'full'
  // },
  // {
  //   path: 'addsupplier',
  //   component: SupplierFormComponent

  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
