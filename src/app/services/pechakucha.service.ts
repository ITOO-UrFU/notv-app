import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response, RequestOptionsArgs} from '@angular/http';
import {User} from 'app/user';
import {Observable} from 'rxjs/Observable';
import {Event} from 'app/events/event';


import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const pechaKuchaUrl = 'https://openedu.urfu.ru/edcrunch/api/v1/pechakucha/';

@Injectable()
export class PechaKuchaService {

  constructor(private http: Http) {
  }



  pechaKucha(): Observable<any> {
    return this.http.get(pechaKuchaUrl + 'get', this.jwt())
      .map(this.extractpechaKucha)
      .catch(this.handleError);
  }


  registerPechaKucha(): Observable<any> {
    return this.http.get(pechaKuchaUrl + 'accept', this.jwt())
      .map(this.extractpechaKucha)
      .catch(this.handleError);
  }

  setParticipationType(status): Observable<any> {
    return this.http.post(pechaKuchaUrl + 'save',{status:status}, this.jwt() )
      .map(this.extractpechaKucha)
      .catch(this.handleError);
  }

  unregisterPechaKucha(): Observable<any> {
    return this.http.get(pechaKuchaUrl + 'remove', this.jwt())
      .map(this.extractpechaKucha)
      .catch(this.handleError);
  }

  extractpechaKucha(res: Response) {
    let body = res.json();
    return body;
  }

  set

  private handleError(error: Response | any) {
    return Observable.throw('error');
  }

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': currentUser.token });
      return new RequestOptions({ headers: headers });
    }
    // else{
    //   return new RequestOptions({ });
    // }
  }

}
