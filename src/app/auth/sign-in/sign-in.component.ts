import { Component, OnInit } from '@angular/core';
//import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: []
})
export class SignInComponent implements OnInit {
 
  loading!:boolean;
  signinForm!:FormGroup;
  httpResponse!:{error:boolean,statusText:string};

  constructor(private fb: FormBuilder,private route:Router,private auth:AuthService) { 
// ,private auth:AuthService
  }

  ngOnInit() {
    this.httpResponse={'error':false,'statusText':''};
    this.loading=false;
    this.signinForm= new FormGroup({
      'userName': new FormControl(null,Validators.required),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'rememberme':new FormControl('')
    });


    if(this.auth.isLoggedIn()){
      this.route.navigate(['']);
    }
    else if(localStorage.getItem('credentials')!=null){
      
      this.signinForm.setValue(JSON.parse(localStorage.getItem('credentials')||'{}'));
      this.onSubmit();
    }

     
  }

  onSubmit(){
    this.httpResponse={'error':false,'statusText':''};
    this.loading=true;
    this.auth.signIn(this.signinForm.value).subscribe(
      d=>{ 
        this.auth.saveSession(d.token);
        
        if(this.signinForm.get('rememberme')?.value==true){
          localStorage.setItem('credentials',JSON.stringify(this.signinForm.value));
        }
        
        this.route.navigate(['']);
         
      },
      err=>{
        console.log(err);
        this.httpResponse={'error':true,'statusText':err.error.message!=undefined?err.error.message:err.statusText};
        this.loading=false;
      }
    );
  }


}
