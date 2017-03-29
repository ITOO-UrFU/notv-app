import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
       // this.router.navigate(['/login'], { queryParams: { returnUrl: "state.url" }});
       console.log("AuthGuard called");
        return false;
    }
}