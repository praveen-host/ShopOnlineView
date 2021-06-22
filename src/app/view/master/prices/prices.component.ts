import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {

  constructor(private master: MasterService) { }

  ngOnInit(): void {
    this.master.getPrices()
    .subscribe(response=>{console.log(response)},error=>{console.log(error)});
  }

}
