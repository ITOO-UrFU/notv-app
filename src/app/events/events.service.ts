import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Event } from 'app/events/event';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class EventsService {

  private eventsUrl = 'http://openedu.urfu.ru:33017/api/v1/events';

  constructor( private http: Http ) { }


  getEventsList (): Observable<Event[]> {
    let eventsList: string;
    return this.http.get(this.eventsUrl)
                    .map(this.extractEvents)
                    .catch(this.handleError);
                    
  }

    private extractEvents(res: Response):Event[] {
    let body = res.json();
    let events: Event[] = [];
    for (let i = 0; i < body.length; i++) {
          let event:Event = new Event(body[i].id, body[i].title, body[i].description, body[i].get_users, new Date(body[i].startdate), body[i].enddate ); 
          events.push(event);
    } 
    return events;
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
