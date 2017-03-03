import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Page } from 'app/page'

@Injectable()
export class PageService {

  private pageUrl = 'http://openedu.urfu.ru:33017/api/v1/pages';
  private pageList = 'http://openedu.urfu.ru:33017/api/v1/pages/map/?format=json'

  constructor ( private http: Http ) { }
  
  getPageList (): Observable<any> {
    let pageList: string;
    return this.http.get(this.pageList)
                    .map(res => <any>res.json())
                    .catch(this.handleError);
                    
  }


  /*getPages (url:string ): Observable<Page> {
    return this.http.get(this.pageUrl+ url +'/?format=json')
                    .map(this.extractPage)
                    .catch(this.handleError);
  }*/

  getPages (url:string): Observable<Page> {
    return this.http.get(this.pageUrl+ url +'/?format=json')
                    .map(this.extractPage)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private extractPages(res: Response) {
    let body = res.json();
    let pages: Page[] = [];
    for (let i = 0; i < body.length; i++) {
          pages.push(new Page(body[i].slug, body[i].html, body[i].keywords, body[i].pages, body[i].title ));
    }
    return pages;
  }

  private extractPage(res: Response) {
    let body = res.json();
    return (new Page(body.slug, body.html, body.keywords, body.pages, body.title ));
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