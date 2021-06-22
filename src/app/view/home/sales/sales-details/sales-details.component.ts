import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NumberFilter } from 'ag-grid-community';
import { SalesOrder } from 'src/app/model/sales-order.model';
import { SalesService } from 'src/app/services/sales.service';
import { faPrint,faPaperPlane} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesDetailsComponent implements OnInit {

  saleOrderDetail!: SalesOrder;
  faPrint=faPrint;
  faPaperPlane=faPaperPlane;
  constructor(private activatedRoute: ActivatedRoute, private salesService: SalesService) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let orderId = params.get('orderid') != null ? params.get('orderid') : "0";

      this.salesService.getSalesOrderDetail(
        orderId
      )
        .subscribe(d => {
          console.log(d)
          this.saleOrderDetail = d;
        },
          err => { console.log(err) });
    });
  }


  ngOnInit(): void {
  }
  print(){
    window.print();
  }
}
