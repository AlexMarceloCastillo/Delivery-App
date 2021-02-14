import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryGuard implements CanActivate {
    constructor(private authSvc: AuthService){
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authSvc.getDataClient().pipe(
      take(1),
      map((user)=> user && user.role == 1),
      tap( canAdmin => {
        if(!canAdmin){
          this.authSvc.toastrSvc.warning('Necesita permisos especiales para acceder a esta pagina','',{
            positionClass: 'toast-center-center',
            timeOut: 900
          })
          this.authSvc.router.navigate(['/home'])
        }
      } )
    );
  }

}
