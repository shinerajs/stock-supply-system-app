import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './admin-layout/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SuppliertabComponent } from './suppliertab/suppliertab.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'suppliertab',
    component: SuppliertabComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
