import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { Role } from '@core/modelos/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate,CanActivateChild {

  constructor(private authSvc: AuthService){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean  {
    return this.authSvc.getDataClient().pipe(
      take(1),
      map( (user)=> user && user.role == Role.Admin),
      tap( canAdmin => {
        if(!canAdmin){
          this.authSvc.toastrSvc.warning('Necesita permisos especiales para acceder a esta pagina','',{
            positionClass: 'toast-center-center',
            timeOut: 1000
          })
          this.authSvc.router.navigate(['/home'])
        }
      })
    );
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
