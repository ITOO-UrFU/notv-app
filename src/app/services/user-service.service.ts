import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from 'app/user';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class UserService {

  constructor(private http: Http) { }

registerUrl = 'http://openedu.urfu.ru:33017/api/v1/rest-auth/';

    create(user: User) {
        return this.http.post(this.registerUrl+'registration/', user, this.jwt()).map((response: Response) => response.json());
    }


    getProfile(): Observable<any> {
        return this.http.get(this.registerUrl+ 'profile/' +'?format=json', this.jwt())
                    .map(this.extractProfile)
                   // .catch(this.handleError);
  }

  extractProfile(res: Response) {
    let body = res.json();
    return body;
     
  }
  
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
