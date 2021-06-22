import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SalesOrder } from 'src/app/model/sales-order.model';
import { SalesService } from 'src/app/services/sales.service';
import { faTruck,faPaperPlane,faPrint} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  faPrint=faPrint;
  faTruck=faTruck;
  faPaperPlane=faPaperPlane;
  salesForm!:FormGroup;
  salesData!:SalesOrder[];

  constructor(private fb:FormBuilder,private salesService:SalesService) { }

  ngOnInit(): void {
    const currentDate=(new Date()).toISOString().slice(0,10);

    this.salesForm=this.fb.group({
      fromDate:[currentDate],
      toDate:[currentDate]
    });

    let salesFilter=sessionStorage.getItem('sales-filter');
    if(salesFilter){
      this.salesForm.patchValue(JSON.parse(salesFilter));
      let tempSalesData=sessionStorage.getItem('sales-data');
      if(tempSalesData){
        this.salesData=JSON.parse( tempSalesData);
      }
    }
    

  }
  sumbit(){
    this.salesService.getSalesOrder(this.salesForm.value)
    .subscribe(
      d=>{
        this.salesData=d.orderList;
        sessionStorage.setItem('sales-filter',JSON.stringify(this.salesForm.value));
        sessionStorage.setItem('sales-data',JSON.stringify( d.orderList));
      },
      err=>{console.log(err)}
    );
  }

  print(){
//    window.print();
  }

}
