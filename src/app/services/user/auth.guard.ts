import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'firebase/auth'
import { DataService } from 'src/app/data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router,
    private ds: DataService,
    private ngZone: NgZone) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tempId = this.ds.getUserId();
      //console.log('look here');
      //console.log(tempId);
      if (tempId === undefined || tempId === null) {
        reject ( false) ;
        this.router.navigate(['/login']);
      } else {
        resolve ( true );
      }
    });
  }



}// close of class Authguard