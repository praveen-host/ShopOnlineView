import { Component, Input, OnInit } from '@angular/core';
import { SalesOrder } from 'src/app/model/sales-order.model';

@Component({
  selector: 'app-print-sales-order',
  templateUrl: './print-sales-order.component.html',
  styleUrls: ['./print-sales-order.component.css']
})
export class PrintSalesOrderComponent implements OnInit {

  @Input() saleOrderDetail!:SalesOrder;

  constructor() { }

  ngOnInit(): void {
  }

}
