import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class HomePageService {

  private homepageUrl = 'https://openedu.urfu.ru/edcrunch/api/v1/pages/home/?format=json';

  

  constructor( private http: Http ) { }


  getHomePage(): Observable<any> {
    let eventsList: string;
    return this.http.get(this.homepageUrl)
                    .map(this.extractHomePage)
                    .catch(this.handleError);
  }

private extractHomePage(res: Response):any {
    let body = res.json();
    return body;
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
   // return Observable.throw(customMsg);
    return errMsg;
  }

}