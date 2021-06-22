import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService:AuthService,private jwtHelper: JwtHelperService,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    
    if(!this.jwtHelper.isTokenExpired(this.authService.getToken()))
      return true;
    else 
      this.router.navigate(['auth']);
    return false;
    
  }
}
