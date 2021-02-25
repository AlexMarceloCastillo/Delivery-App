import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClosedGuard implements CanActivate {
    constructor(private authSvc: AuthService,private router: Router){
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.authSvc.openDelivery == true){
        this.router.navigate(['/home'])
        return false;
      }else{
        return true;
      }
  }

}
