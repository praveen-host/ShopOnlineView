import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JwtModule } from "@auth0/angular-jwt";
import { AgGridModule } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';

import { LayoutComponent } from './view/layout/layout.component';
import { HomeComponent } from './view/home/home.component';
import { NavbarComponent } from './view/layout/navbar/navbar.component';
import { ProductComponent } from './view/master/product/product.component';
import { SalesComponent } from './view/home/sales/sales.component';
import { LoadingSlipComponent } from './view/home/loading-slip/loading-slip.component';
import { UomComponent } from './view/master/uom/uom.component';
import { PricesComponent } from './view/master/prices/prices.component';
import { StoresComponent } from './view/master/stores/stores.component';
import { SalesDetailsComponent } from './view/home/sales/sales-details/sales-details.component';
import { PrintSalesOrderComponent } from './view/print/print-sales-order/print-sales-order.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignInComponent,
    LayoutComponent,
    HomeComponent,
    NavbarComponent,
    ProductComponent,
    SalesComponent,
    LoadingSlipComponent,
    UomComponent,
    PricesComponent,
    StoresComponent,
    SalesDetailsComponent,
    PrintSalesOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('token');
        }
      }
    }),
    AgGridModule.withComponents([]),
    FontAwesomeModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
