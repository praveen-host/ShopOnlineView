import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ProductUomModel } from 'src/app/model/product-uom.model';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.css']
})
export class UomComponent implements OnInit {
  uomList!:ProductUomModel[];
  uomForm!:FormGroup;
  isEditing!:boolean;
  loading!:boolean;
  constructor(private fb:FormBuilder,private uomService:MasterService) {     
  }

  ngOnInit(): void {
    this.loading=this.isEditing=false;

    this.uomForm=this.fb.group({
      uomType:['simple',[Validators.required]],
      uomDecimalPlaces:['0',Validators.required],
      uomFormalName:['',Validators.required],
      uomSymbol:['',Validators.required]
    });

    this.uomService.getUom()
    .subscribe(response=>{
      this.uomList=response;
    },error=>{
      console.log(error);
    });
  }

  addUom(){
    this.loading=true;
    this.uomService.addUom(this.uomForm.value)
    .subscribe(response=>{
      console.log(response);
      this.loading=false;
    },error=>{
      console.log(error);
      this.loading=false;
    });
  }

  cancel(){
    this.uomForm.reset();
    this.uomForm.patchValue({uomType:'simple',uomDecimalPlaces:'0'});
  }
}
