import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {environment} from "src/environments/environment";
import { SalesOrder } from "../model/sales-order.model";

@Injectable({
    providedIn:'root'
})
export class SalesService{
    private baseUrl!: string;
    constructor(private http: HttpClient) {
      this.baseUrl = environment.baseUrl;
    }
  
    getSalesOrder(req:{fromDate:Date,toDate:Date}) {
      return this.http
      .post<{totalRecords:number,orderList:SalesOrder[]}>
      (this.baseUrl + '/transaction/GetSalesOrders',
        req,
        {
          headers: new HttpHeaders(
            {
              'Content-Type': 'application/json',
              Authorization: 'bearer ' + sessionStorage.getItem('token')
            })
        });
  
    }

    getSalesOrderDetail(orderId:string|null) {
        return this.http
        .post<SalesOrder>
        (this.baseUrl + '/transaction/GetSalesOrders/'+orderId,
          {},
          {
            headers: new HttpHeaders(
              {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + sessionStorage.getItem('token')
              })
          });
    
    }

    

    
}