import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
//import jwt_decode from 'jwt-decode'; 
import { Observable } from 'rxjs'; 
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


import {environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl!:string;

  constructor(private http:HttpClient, private route:Router
    , private jwtHelper:JwtHelperService
    ) { 
    this.baseUrl=environment.baseUrl;

    if(sessionStorage.getItem('token')!=null){
//      this.userDetail=jwt_decode(sessionStorage.getItem('token'));
    }
    
  }

  signIn(siginForm:{userName:string,password:string}): Observable<any>{ 
    return this.http.post<any>(this.baseUrl+'/auth/login',
      {
        "emailId":siginForm.userName,
        "password":siginForm.password  
      }
    );
  }
  signOut(){
    sessionStorage.removeItem('token');
    localStorage.removeItem('credentials')
    this.route.navigate(['auth']);

  }
  getToken():string|undefined{
    let token=sessionStorage.getItem('token');
    return token?token:undefined;
  }

  saveSession(token:string){

    sessionStorage.setItem('token',token);
   // this.userDetail=jwt_decode(token);
    
  }

  isLoggedIn(){
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

}
