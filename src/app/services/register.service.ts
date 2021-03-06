import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from 'app/user';
import { Observable } from 'rxjs/Observable';
import { Event } from 'app/events/event';
import { TranslateService } from 'app/translate/translate.service';


import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class RegisterService {

  constructor(private http: Http, private _translate: TranslateService) { }

    registerUrl = 'https://openedu.urfu.ru/edcrunch/api/v1/rest-auth/';
  // registerUrl = 'http://93.88.177.60:8089/edcrunch/api/v1/rest-auth/';

// (): Observable<any>

    create(user: User): Observable<User> {
      console.log('create(user: User)', user);
        return this.http.post(this.registerUrl + 'registration/', user)
          .map((response: Response) => { response.json()})
          .catch(this.handleError);
    }

    createStudent(user: any) {
        return this.http.post(this.registerUrl + 'registration-students/', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put(this.registerUrl + 'profile/update/', user, this.jwt()).map((response: Response) => response.json());
    }

    getProfile(): Observable<any> {
        return this.http.get(this.registerUrl + 'profile/' + '?format=json', this.jwt())
                    .map(this.extractProfile)
                    .catch(this.handleError);
    }

  private handleError (error: Response | any) {
    let body = error.json();
    console.log('handleError from service');
    // return body;
    return Observable.throw(body);
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

    const offset = new Date().getTimezoneOffset();
    const body = res;

    const events: Event[] = [];
    for (let i = 0; i < body.length; i++) {
      let eventTypeClass = "eventtype-empty";
      let slug = 'empty';

      if (body[i].event.get_event_slug != null) {
        eventTypeClass = "eventtype-" + body[i].event.get_event_slug;
        slug = body[i].event.get_event_slug;
      }

      let path = null;

      if (body[i].event.path) {
        path = {
          title: this._translate.currentLang === 'ru' ? body[i].event.path.title : body[i].event.path.title_en,
          slug: body[i].event.path.slug
        };
      }
      let room = null;
      if (body[i].event.room) {
        room = {
          title: this._translate.currentLang === 'ru' ? body[i].event.room.title : body[i].event.room.title_en,
          slug: body[i].event.room.slug,
        };
      }

     const startdate = new Date(body[i].event.startdate);
     const enddate = new Date(body[i].event.enddate);
     startdate.setMinutes(startdate.getMinutes() + offset.valueOf());
     enddate.setMinutes(enddate.getMinutes() + offset.valueOf());
      const event: Event = new Event(
        body[i].event.id,
        this._translate.currentLang === 'ru' ? body[i].event.title : body[i].event.title_en,
        this._translate.currentLang === 'ru' ? body[i].event.description : body[i].event.description_en,
        body[i].event.get_speakers,
        startdate,
        enddate,
        eventTypeClass,
        // body[i].get_type_display,
        this._translate.currentLang === 'ru' ? body[i].event.get_type_display : body[i].event.get_type_display_en,
        body[i].event.get_line_of_work_slug,
        slug,
        body[i].event.room,
        path,
        body[i].translation || ''
      );
      event.get_speakers.sort((a,b) => (a.person.karma > b.person.karma) ? -1 : ((b.person.karma > a.person.karma) ? 1 : 0));
      // event.get_speakers = event.get_speakers.filter(user => user.get_type_display !== 'Участник');
      events.push(event);
    }

    // eventsList = events;
    return events;
  }

 // extractEvents(res: any): Event[] {
 //    const offset = new Date().getTimezoneOffset();
 //    const body = res;
 //    const events: Event[] = [];
 //    for (let i = 0; i < body.length; i++) {
 //          let eventTypeClass = 'eventtype-empty';
 //          let slug = 'empty';
 //          if (body[i].event.get_event_slug != null) {
 //              eventTypeClass = 'eventtype-' + body[i].event.get_event_slug;
 //              slug = body[i].event.get_event_slug;
 //         }
 //          const startdate = new Date(body[i].event.startdate);
 //          const enddate = new Date(body[i].event.enddate);
 //          startdate.setMinutes(startdate.getMinutes() + offset.valueOf());
 //          enddate.setMinutes(enddate.getMinutes() + offset.valueOf());
 //          const event: Event = new Event(
 //            body[i].event.id,
 //            body[i].event.title,
 //            body[i].event.description,
 //            body[i].event.get_speakers,
 //            startdate,
 //            enddate,
 //            eventTypeClass,
 //            body[i].event.get_type_display,
 //            body[i].event.get_line_of_work_slug,
 //            slug,
 //            body[i].event.room,
 //            body[i].path,
 //            );
 //          events.push(event);
 //    }
 //    return events;
 //  }

  private jwt() {

    console.log("call jwt");
    // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token });
          console.log("call RequestOptions", headers);
          return new RequestOptions({ headers: headers });
        }
    // console.log("end call jwt");
    // return new RequestOptions({});
        // else{
        //   return new RequestOptions({ });
        // }
    }
}
