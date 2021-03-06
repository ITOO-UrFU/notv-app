import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
       this.router.navigate(['/login']);
        return false;
    }

    is_logged() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    // this.router.navigate(['/login']);
    return false;
  }
}
