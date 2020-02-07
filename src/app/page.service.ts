import {Injectable, Inject, forwardRef} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import { TranslateService } from 'app/translate/translate.service';

import 'rxjs/add/observable/throw';
//import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/subscribe';
import 'rxjs/add/operator/toPromise';

import {Page} from 'app/page';
import {ActivatedRoute} from '@angular/router';


@Injectable()
export class PageService {

  private pageUrl = 'https://openedu.urfu.ru/edcrunch/api/v1/pages';
  private pageList = 'https://openedu.urfu.ru/edcrunch/api/v1/pages/map/?format=json';

  constructor(
    private http: Http,
    public _translate: TranslateService
    ) {

      // console.log("translate", this.translate);
    // this.translate = translate;
  }

  getPageList(): Observable<any> {
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

  getPages(url: string): Observable<Page> {
    // console.log(this.translate);

    return this.http.get(this.pageUrl + url + '/?format=json')
      .map((data => {
        let body = data.json();
        console.log(body)
        return (new Page(
            body.slug,
          this._translate.currentLang.toLocaleLowerCase() === 'ru' ? body.html : body.html_en,
            body.keywords,
            body.pages,
          this._translate.currentLang.toLocaleLowerCase() === 'ru' ? body.title :  body.title_en,
            body.type
        ));
      }))
  .catch(this.handleError);
  }
  //
  // private extractData(res: Response) {
  //   let body = res.json();
  //   return body || {};
  // }

  private extractPages(res: Response) {
    let body = res.json();
    let pages: Page[] = [];
    // console.log(this._translate.currentLang);
    for (let i = 0; i < body.length; i++) {
        pages.push(new Page(body[i].slug, body[i].html, body[i].keywords, body[i].pages, body[i].title, body[i].type));
    }
    return pages;
  }

  private extractPage(res: Response) {
    let body = res.json();
    // console.log(this.translate);
    return (new Page(
      body.slug,
      body.html,
      body.keywords,
      body.pages,
      body.title,
      body.type
      )
    );
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    let customMsg: string = 'Нет такой страницы!'
    return Observable.throw(customMsg);
    //return errMsg;
  }
}
