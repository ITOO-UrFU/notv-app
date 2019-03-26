import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    authUrl = 'https://openedu.urfu.ru/edcrunch/api/v1/rest-auth/login/';

    passwordUrl = 'https://openedu.urfu.ru/edcrunch/api/v1/';

    isLoggedIn: boolean = false;

    constructor(private http: Http, private router: Router) { }

    resetPassword( email: string) {
            return this.http.post(this.passwordUrl+"reset_password/", { email: email }, this.jwt());
    }

    changePassword(password_old: string, password1: string, password2: string) {
            return this.http.post(this.passwordUrl + "change_password/",
            {
              password_old: password_old,
              password1: password1,
              password2: password2
            }, this.jwt());
    }

    login( email: string, password: string) {
        return this.http.post(this.authUrl, { email: email, password: password }, this.jwt1())
            .map((response: Response) => {
            const user = response.json();
            if (user && user.token) {
                console.log("LOLLLLL")
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.router.navigate(['profile', 'my']);
                window.location.reload();
              }
            });
    }

    private jwt1() {
            const headers = new Headers({ 'Content-Type': 'application/json'});
            return new RequestOptions({ headers: headers });

    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

    logout() {
      console.log("LOGOUT AUTH SERVICE");
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        window.location.reload();
    }
}
