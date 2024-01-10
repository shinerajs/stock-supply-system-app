import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from './components/dashboard/supplier/supplier.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { LandingComponent } from './components/landing/landing.component';
import { ProductComponent } from './components/dashboard/product/product/product.component';
import { ViewSupplierComponent } from './components/dashboard/supplier/view-supplier/view-supplier.component';

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
    path: '', pathMatch: 'full', component: SupplierComponent, ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'supplier', component: SupplierComponent, ...canActivate(redirectUnauthorizedToLogin)
  },

  {
    path: 'product', component: ProductComponent, ...canActivate(redirectUnauthorizedToLogin)
  },

  {
    path: 'view_supplier/:supplier_id', component: ViewSupplierComponent, ...canActivate(redirectUnauthorizedToLogin)
  },

  {
    path: 'dashboard',
    children: [
      {
        path: 'supplier', component: SupplierComponent
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
