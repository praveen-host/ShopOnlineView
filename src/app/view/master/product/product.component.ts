import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MasterService } from 'src/app/services/master.service';

import { faPencilAlt, faCamera } from '@fortawesome/free-solid-svg-icons';
import { ProductModel } from 'src/app/model/product.model';
import { ProductGstModel } from 'src/app/model/product-gst.model';
import { ProductUomModel } from 'src/app/model/product-uom.model';
import {environment} from 'src/environments/environment';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  loading!:boolean;
  isEditing!:boolean;
  baseUrl:string=environment.baseUrl;
  productEditForm!: FormGroup;

  rowData: ProductModel[] = [];
  gstData: ProductGstModel[] = [];
  uomData: ProductUomModel[] = [];
  imageSrc!:string;

  faPencilAlt=faPencilAlt;
  faCamera=faCamera;

  constructor(private fb: FormBuilder, private master: MasterService) {

  }

  ngOnInit(): void {    

    this.productEditForm = this.fb.group({
      productCode: ['', Validators.required],
      hsnCode: ['',Validators.required],
      skuName: ['',Validators.required],
      uomSymbol: ['',Validators.required],
      brand: ['',Validators.required],
      category: ['',Validators.required],
      shortDescription: [''],
      longDescription: [''],
      image:[null]

    });
    this.master.getProducts().subscribe(
      data => {
        console.log(data);
        this.rowData = data;
      }
    );
    this.master.getGst().subscribe(
      data=>{
        this.gstData=data;
      },
      err=>{}
    );
    this.master.getUom().subscribe(
      data=>{
        this.uomData= data;
      },
      err=>{}
    );

  }

  editProduct(row: ProductModel) {
    this.isEditing=true;

    this.productEditForm.patchValue(row);
    this.imageSrc=this.baseUrl+'/assets/images/product/'+row.prodcutImages[0].fileName;
  }

  uploadFile(event:any) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
          this.imageSrc = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
  }

    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
      
    //   const reader = new FileReader();
    //   reader.onload = e => this.imageSrc =URL.createObjectURL(file);// reader!=null? reader.result:"";

    //   //reader.readAsDataURL(file);

    //   this.productEditForm.patchValue({
    //     image: file 
    //   });
    //   this.productEditForm.get('image')?.updateValueAndValidity()
    // }

  }

  submit() {
    console.log(this.productEditForm.value);

    if(this.isEditing){
      this.master.updateProduct(this.productEditForm.value,this.productEditForm.get('image')?.value)
      .subscribe(
        resp=>{console.log(resp)
        },
        err=>{console.log(err)
        });
    }
    else{
      this.master.addProduct(this.productEditForm.value,this.productEditForm.get('image')?.value)
      .subscribe(
        resp=>{console.log(resp)
        },
        err=>{console.log(err)
        });
    }
    
    this.isEditing=false;
  }

  cancel(){
    this.productEditForm.reset();
    this.isEditing=false;
    this.imageSrc='';
  }
}
