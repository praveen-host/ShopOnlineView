import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ProductModel } from 'src/app/model/product.model';
import { ProductGstModel } from 'src/app/model/product-gst.model';
import { ProductUomModel } from 'src/app/model/product-uom.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private baseUrl!: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getPrices() {
    return this.http.get<any>(this.baseUrl + '/master/price',
    {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + sessionStorage.getItem('token')
        })
    });

  }

  getProducts() {
    return this.http.get<ProductModel[]>(this.baseUrl + '/master/product',
    {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + sessionStorage.getItem('token')
        })
    });

  }

  addProduct(productInfor: ProductModel,image:File): Observable<any> {
    var formData: any = new FormData();
    formData.append("productCode", productInfor.productCode);
    formData.append("brand", productInfor.brand);
    formData.append("category", productInfor.category);
    formData.append("skuName", productInfor.skuName);
    formData.append("shortDescription", productInfor.shortDescription);
    formData.append("longDescription", productInfor.longDescription);
    formData.append("uomSymbol", productInfor.uomSymbol);
    formData.append("hsnCode", productInfor.hsnCode);
    formData.append("status", productInfor.status);
    formData.append("Image", image);

    return this.http.post<any>(this.baseUrl + '/master/product', formData, 
      {
        headers: new HttpHeaders(
          {
            
            "Access-Control-Allow-Origin":"*",
            "Authorization": 'bearer '+sessionStorage.getItem('token')
          })
      
      }

    );

  }

  updateProduct(productInfor: ProductModel,image:File): Observable<any> {
    var formData: any = new FormData();
    formData.append("productCode", productInfor.productCode);
    formData.append("brand", productInfor.brand);
    formData.append("category", productInfor.category);
    formData.append("skuName", productInfor.skuName);
    formData.append("shortDescription", productInfor.shortDescription);
    formData.append("longDescription", productInfor.longDescription);
    formData.append("uomSymbol", productInfor.uomSymbol);
    formData.append("hsnCode", productInfor.hsnCode);
    formData.append("status", productInfor.status);
    formData.append("Image", image);

    return this.http.post<any>(this.baseUrl + '/master/productUpdate', formData, 
      {
        headers: new HttpHeaders(
          {
            
            "Access-Control-Allow-Origin":"*",
            "Authorization": 'bearer '+sessionStorage.getItem('token')
          })
      
      }

    );

  }
 
  addUom(uom:ProductUomModel){
    return this.http.post<any>(this.baseUrl + '/master/uom', uom, 
      {
        headers: new HttpHeaders(
          {
            "Access-Control-Allow-Origin":"*",
            "Authorization": 'bearer '+sessionStorage.getItem('token')
          })      
      }
    );
  }

  getUom():Observable<ProductUomModel[]> {
    return this.http.get<ProductUomModel[]>(this.baseUrl + '/master/uom',
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            Authorization: 'bearer ' + sessionStorage.getItem('token')
          })
      });
  }

  getGst() {
    return this.http.get<ProductGstModel[]>(this.baseUrl + '/master/gst',
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            Authorization: 'bearer ' + sessionStorage.getItem('token')
          })
      });
  }


}
