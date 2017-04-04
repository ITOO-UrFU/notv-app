import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    authUrl = 'https://openedu.urfu.ru/edcrunch/api/v1/rest-auth/login/';

    isLoggedIn: boolean = false;

    constructor(private http: Http, private router: Router) { }

    login( email: string, password: string) {
        return this.http.post(this.authUrl, { email: email, password: password }, this.jwt())
            .map((response: Response) => {
            const user = response.json();
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.router.navigate(['profile', 'edit']);
                window.location.reload();
              }
            });
    }
    private jwt() {
            const headers = new Headers({ 'Content-Type': 'application/json'});
            return new RequestOptions({ headers: headers });

    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        window.location.reload();
    }
}