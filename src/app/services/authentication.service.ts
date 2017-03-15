import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    authUrl = 'http://openedu.urfu.ru:33017/api/v1/rest-auth/login/';

    constructor(private http: Http) { }

    login( email: string, password: string) {
        return this.http.post(this.authUrl, { email: email, password: password }, this.jwt())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
            let user = response.json();
            console.log(user);
            if (user && user.token) {
                console.log(user);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
              }
            });
    }
    private jwt() {
        // create authorization header with jwt token

            let headers = new Headers({ 'Content-Type': 'application/json'});
            return new RequestOptions({ headers: headers });
        
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}