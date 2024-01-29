import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from './views/admin/supplier/supplier.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { LandingComponent } from './views/auth/landing/landing.component';
import { DashboardComponent } from './views/supplierdetails/dashboard/dashboard.component';
import { SuppliertabComponent } from './views/admin/suppliertab/suppliertab.component';
import { CompanydetailsComponent } from './views/supplierdetails/companydetails/companydetails.component';
import { SupplierworksComponent } from './views/supplierdetails/supplierworks/supplierworks.component';
import { SidemenuComponent } from './views/supplierdetails/supplier-layout/sidemenu.component';
import { NormaluserguardGuard } from './shared/guard/normaluserguard.guard';
import { SidebarComponent } from './views/admin/admin-layout/sidebar.component';
import { AdminguardGuard } from './shared/guard/adminguard.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/loginuser']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/loginuser']);

const routes: Routes = [
  {
    path: 'commondashboard', component: DashboardComponent, ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'loginuser', component: LandingComponent, ...canActivate(redirectLoggedInToHome)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'supplier',
    component: SidemenuComponent, ...canActivate(redirectUnauthorizedToLogin),
    canActivateChild: [NormaluserguardGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./views/supplierdetails/supplierdetails.module').then(m => m.SupplierdetailsModule),
      },
    ]
  },
  {
    path: 'admin',
    component: SidebarComponent, ...canActivate(redirectUnauthorizedToLogin),
    canActivateChild: [AdminguardGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule),
      },

    ]
  },
  // {
  //   path: 'loginuser', component: LandingComponent, ...canActivate(redirectLoggedInToHome)
  // },
  // {
  //   path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome)
  // },
  // {
  //   path: 'register', component: RegisterComponent, ...canActivate(redirectLoggedInToHome)
  // },
  // {
  //   path: '', pathMatch: 'full', component: DashboardComponent, ...canActivate(redirectUnauthorizedToLogin)
  // },
  // {
  //   path: 'supplier', component: SidemenuComponent, ...canActivate(redirectUnauthorizedToLogin)
  // },
  // {
  //   path: 'dashboard', component: DashboardComponent, ...canActivate(redirectUnauthorizedToLogin)
  // },

  // {
  //   path: 'dashboard',
  //   children: [
  //     {
  //       path: 'suppliertab', component: SuppliertabComponent
  //     },
  //     {
  //       path: 'company-details', component: CompanydetailsComponent
  //     },
  //     {
  //       path: 'supplier-works', component: SupplierworksComponent
  //     }
  //   ], ...canActivate(redirectUnauthorizedToLogin)
  // },

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
