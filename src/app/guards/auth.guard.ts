import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, pipe } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../cliente/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.isAuth()
    .pipe(take(1))
    .pipe(map(authState => !!authState))
    .pipe(tap(auth => {
      if(!auth){
        this.authSvc.toastrSvc.error('Necsita loguearse!!','',{
          positionClass: 'toast-center-center',
          timeOut: 800
        })
        this.authSvc.router.navigate(['/login'])
      }
    })
    )
  }

}
