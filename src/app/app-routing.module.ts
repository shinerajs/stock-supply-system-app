import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from './components/dashboard/supplier/supplier.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '', redirectTo: '/supplier', pathMatch: 'full'
      },
      {
        path: 'supplier', component: SupplierComponent
      }
    ], ...canActivate (() => redirectUnauthorizedTo(['/register']))
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
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
