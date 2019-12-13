import { Injectable,NgZone } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app'
import 'firebase/auth'
import * as config from '../../app.firebaseconfig';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private ngZone: NgZone) {
   
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.onAuthStateChanged((user: firebase.User) => this.ngZone.run(() => {
        if (user) {
          resolve(true);
        } else {
          console.log('Usser is not logged in');
          this.router.navigate(['/login']);
          resolve(false);
        }
      }));
    });
  }
  

 
}// close of class Authguard