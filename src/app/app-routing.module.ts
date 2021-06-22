import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './view/home/home.component';
import { LoadingSlipComponent } from './view/home/loading-slip/loading-slip.component';
import { SalesDetailsComponent } from './view/home/sales/sales-details/sales-details.component';
import { SalesComponent } from './view/home/sales/sales.component';
import { LayoutComponent } from './view/layout/layout.component';
import { PricesComponent } from './view/master/prices/prices.component';
import { ProductComponent } from './view/master/product/product.component';
import { StoresComponent } from './view/master/stores/stores.component';
import { UomComponent } from './view/master/uom/uom.component';

const routes: Routes = [
  { path:'auth',component:SignInComponent},
  { path:'', component:LayoutComponent, 
    children:[
      {path:'',component:HomeComponent},
      {path:'sales',component:SalesComponent},
      {path:'orderdetail/:orderid',component:SalesDetailsComponent},
      {path:'loadingslip',component:LoadingSlipComponent},
      {path:'master/product',component:ProductComponent},
      {path:'master/price',component:PricesComponent},
      {path:'master/uom',component:UomComponent},
      {path:'master/store',component:StoresComponent}
    ],canActivate:[AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
