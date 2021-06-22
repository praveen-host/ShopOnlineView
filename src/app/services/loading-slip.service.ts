import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment'; 
import { Observable } from 'rxjs';
import { TmplAstBoundAttribute } from '@angular/compiler';
import { LoadingSlipDetailModel } from '../model/loading-slip-detail.model';

@Injectable({
  providedIn: 'root'
})
export class LoadingSlipService {

    private baseUrl!: string;
    constructor(private http: HttpClient) {
      this.baseUrl = environment.baseUrl;
    }

    getOrdersToGenerateLoadingSlip(request:{fromDate:Date,toDate:TmplAstBoundAttribute,orderStatus:string[]}) {
        return this.http
        .post<LoadingSlipDetailModel[]>
        (this.baseUrl + '/transaction/getOrdersToGenerateLoadingSlip',
          request,
          {
            headers: new HttpHeaders(
              {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + sessionStorage.getItem('token')
              })
          });
    
    }
  
}