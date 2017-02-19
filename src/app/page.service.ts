import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Page } from 'app/page'

@Injectable()
export class PageService {

  private pageUrl = 'http://localhost:8020/api/v1/pages';
  private pageList = 'http://localhost:8020/api/v1/pages/map/?format=json'

  constructor ( private http: Http ) { }
  
  getPageList (): Observable<any> {
    let pageList: string;
    return this.http.get(this.pageList)
                    .map(res => <any>res.json())
                    .catch(this.handleError);
                    
  } 




  getPages (url:string ): Observable<Page> {
    return this.http.get(this.pageUrl+ url +'/?format=json')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
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
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}