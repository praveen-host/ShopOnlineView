import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LoadingSlipDetailModel } from 'src/app/model/loading-slip-detail.model';
import { LoadingSlipService } from 'src/app/services/loading-slip.service';

@Component({
  selector: 'app-loading-slip',
  templateUrl: './loading-slip.component.html',
  styleUrls: ['./loading-slip.component.css']
})
export class LoadingSlipComponent implements OnInit {
  closeResult = '';
  filterForm!: FormGroup;
  loadingSlipForm!: FormGroup;

  dropdownList: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  rowData!: LoadingSlipDetailModel[];

  constructor(private fb: FormBuilder, private modalService: NgbModal, private lSlipService: LoadingSlipService) {
  }

  ngOnInit(): void {
    this.loadingSlipForm = this.fb.group({
      vechileType: ['', Validators.required],
      vechileNo: ['', Validators.required],
      driverName: ['', Validators.required],
      driverContactNo: ['', Validators.required],
      orderNoList: this.fb.array([], Validators.required)

    });

    let currentDate = (new Date()).toISOString().slice(0, 10);
    this.filterForm = this.fb.group({
      fromDate: [currentDate],
      toDate: [currentDate],
      orderStatus: [[{ item_id: '3', item_text: 'OFD' }]]
    });

    this.dropdownList = [
      { item_id: 'S', item_text: 'Received' },
      { item_id: '2', item_text: 'Dispatched' },
      { item_id: '3', item_text: 'OFD' },
      { item_id: '4', item_text: 'Delivered' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  view() {
    let reqBody = this.filterForm.value;
    reqBody.orderStatus = reqBody.orderStatus.map((x: { item_id: string }) => { return x.item_id });

    this.lSlipService.getOrdersToGenerateLoadingSlip(reqBody)
      .subscribe(
        response => {
          console.log(response);
          this.rowData = response;

        },
        error => {
          console.log(error)
        });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  orderCheck(event: any, orderNo: number) {
    if (event.currentTarget.checked)
      this.addOrderNo(orderNo);
    else
      this.removeOrderNo(orderNo);
  }

  addOrderNo(orderNo: number) {
    let orderNoList = this.loadingSlipForm.get('orderNoList') as FormArray;
    orderNoList.push(this.fb.group({ orderNo: [orderNo] }));
  }

  removeOrderNo(orderNo: number) {
    let orderNoList = this.loadingSlipForm.get('orderNoList') as FormArray;
    let index = -1;
    let i = 0;

    for (let control of orderNoList.controls) {

      if (control instanceof FormGroup) {
        if (control.get('orderNo')?.value === orderNo) {
          index = i;
          break;
        }
        i++;
      }

    }
    if (index>-1)
      orderNoList.removeAt(index);

  }
  get getSelectedOrderList(): FormArray {
    return this.loadingSlipForm.get('orderNoList') as FormArray

  }
}
