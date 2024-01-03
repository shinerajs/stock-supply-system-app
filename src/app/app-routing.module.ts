import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from './components/dashboard/supplier/supplier.component';

const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '', redirectTo: 'supplier', pathMatch: 'full'
      },
      {
        path: 'supplier',
        component: SupplierComponent
      }
    ]
  }
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent
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
