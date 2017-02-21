import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class EventsService {

  private eventsUrl = 'http://localhost:8020/api/v1/events';

  constructor( private http: Http ) { }


  getEventsList (): Observable<any> {
    let eventsList: string;
    return this.http.get(this.eventsUrl)
                    .map(res => <any>res.json())
                    .catch(this.handleError);
                    
  }

  
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    
    let customMsg: string = "Нет такой страницы!"
    return Observable.throw(customMsg);
    //return errMsg;
  }
}
