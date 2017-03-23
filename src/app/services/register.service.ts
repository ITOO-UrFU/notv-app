import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from 'app/user';
import { Observable } from 'rxjs/Observable';
import { Event } from 'app/events/event';

import 'rxjs/add/observable/throw';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

    registerUrl = 'https://openedu.urfu.ru/edcrunch/api/v1/rest-auth/';

    create(user: User) {
        return this.http.post(this.registerUrl + 'registration/', user, this.jwt()).map((response: Response) => response.json());
    }
    update(user: User) {
        return this.http.put(this.registerUrl + 'profile/update/', user, this.jwt()).map((response: Response) => response.json());
    }

    getProfile(): Observable<any> {
        return this.http.get(this.registerUrl + 'profile/' + '?format=json', this.jwt())
                    .map(this.extractProfile);
                   // .catch(this.handleError);
    }

    registerOnEvent(id: string){
        return this.http.post(
                              this.registerUrl + 'events/register/',
                              {"event_id": id},
                              this.jwt()).map((response: Response) => response.json()
                              );
    }

    unregisterOnEvent(id: string){
        return this.http.post(
                            this.registerUrl + 'events/unregister/',
                            {"event_id": id},
                            this.jwt()).map((response: Response) => response.json()
                            );
    }

  extractProfile(res: Response) {
    let body = res.json();
    return body;
  }

 extractEvents(res: any): Event[] {
    const body = res;
    console.log(body);
    const events: Event[] = [];
    for (let i = 0; i < body.length; i++) {
          let eventTypeClass = "eventtype-empty";
          if (body[i].event.get_event_slug != null) { eventTypeClass = "eventtype-" + body[i].event.get_event_slug; }
          const event: Event = new Event(
            body[i].event.id,
            body[i].event.title,
            body[i].event.description,
            body[i].event.get_speakers,
            new Date(body[i].event.startdate),
            body[i].event.enddate,
            eventTypeClass,
            body[i].event.get_type_display,
            body[i].event.block
            );
          events.push(event);
    }

    // eventsList = events;
    return events;
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
