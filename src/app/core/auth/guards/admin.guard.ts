import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authSvc: AuthService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    return this.authSvc.getDataClient().pipe(
      take(1),
      map((user)=> user && user.role == 4),
      tap( canAdmin => {
        if(!canAdmin){
          this.authSvc.toastrSvc.warning('Necesita permisos especiales para acceder a esta pagina','',{
            positionClass: 'toast-center-center',
            timeOut: 1000
          })
          this.authSvc.router.navigate(['/home'])
        }
      } )
    );
  }

}
