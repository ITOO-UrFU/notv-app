import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { TranslateService } from 'app/translate/translate.service';
import { Event } from 'app/events/event';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

let eventsList: Event[];

@Injectable()
export class EventsService {

    private eventsUrl = 'https://openedu.urfu.ru/edcrunch/api/v1/events';
  // private eventsUrl = 'http://93.88.177.60:8089/edcrunch/api/v1/events';

  // private lang = "en";
  constructor( private http: Http, private _translate: TranslateService) {
    // this.lang = this._translate.currentLang.toLocaleLowerCase();
  }


  getEventsList (): Observable<Event[]> {
    let eventsList: string;
    return this.http.get(this.eventsUrl)
                    .map(response => { return this.extractEvents(response)})
                    .catch(this.handleError);
  }

  getEvent(id: string): Observable<Event> {
    return this.http.get(this.eventsUrl + "/" + id)
                    .map(response => { return this.extractEvent(response)})
                    .catch(this.handleError);
  }

  private extractEvent(res: Response): Event {
  const offset = new Date().getTimezoneOffset();
  // const offset = new Date().getTimezoneOffset();
  // const body = res.json();
    const body = res.json();
    let eventTypeClass = "eventtype-empty";
    let slug = 'empty';

    if (body.get_event_slug != null) {
      eventTypeClass = "eventtype-" + body.get_event_slug;
      slug = body.get_event_slug;
    }

    let path = null;

    if (body.path) {
      path = {
        title: this._translate.currentLang === 'ru' ? body.path.title : body.path.title_en,
        slug: body.path.slug
      };
    }
    let room = null;
    if (body.room) {
      room = {
        title: this._translate.currentLang === 'ru' ? body.room.title : body.room.title_en,
        slug: body.room.slug,
      };
    }

    const startdate = new Date(body.startdate);
    const enddate = new Date(body.enddate);
    startdate.setMinutes(startdate.getMinutes() + offset.valueOf());
    enddate.setMinutes(enddate.getMinutes() + offset.valueOf());

    const event: Event = new Event(
      body.id,
      this._translate.currentLang === 'ru' ? body.title : body.title_en,
      this._translate.currentLang === 'ru' ? body.description : body.description_en,
      body.get_speakers,
      startdate,
      enddate,
      eventTypeClass,
      // body.get_type_display,
      this._translate.currentLang === 'ru' ? body.get_type_display : body.get_type_display_en,
      body.get_line_of_work_slug,
      slug,
      body.room,
      path
    );
    event.get_speakers = event.get_speakers.filter(user => user.get_type_display !== 'Участник');
    return event;
  }

  getEventsByType(type: string): any[] {
    if (eventsList) {
        if (type === '' || type === undefined || type === "all_events") {
            return eventsList;
        } else {
          const arr = eventsList.filter(event => {
            if (event.get_line_of_work_slug) {event.get_line_of_work_slug = event.get_line_of_work_slug.toLowerCase(); }
            return event.get_line_of_work_slug ===  type;
           });
          return arr;
        }
    }
  }

  getEventsObject(type: string): any {
      let object: any =  {};
      let arr = [];

      let eventListFiltered = this.getEventsByType(type);

      eventListFiltered.map(element => {return element.startdate}).forEach(element => {
        if (arr.map(el => el.toString()).indexOf(element.toString()) == -1) {
          if (object[element.getDate()] == undefined){ object[element.getDate()] = []};
          object[element.getDate()].push(element);
          arr.push(element);
        }
      });
      object = {};
      eventListFiltered.forEach(element => {
        if (object[element.startdate.getDate()] == undefined){ object[element.startdate.getDate()] = {}}
        if (object[element.startdate.getDate()][element.startdate.getTime()] == undefined){
          object[element.startdate.getDate()][element.startdate.getTime()] = [];
        }
        object[element.startdate.getDate()][element.startdate.getTime()].push(element);
      });
      return object;
  }

  eventsListToObject(events: Event[]): any {
      let object: any =  {};
      let arr = [];

      const eventListFiltered = events;

      eventListFiltered.map(element => {return element.startdate;  }).forEach(element => {
        if (arr.map(el => el.toString()).indexOf(element.toString()) == -1) {
          if (object[element.getDate()] == undefined) { object[element.getDate()] = []; };
          object[element.getDate()].push(element);
          arr.push(element);
        }
      });
      object = {};
      eventListFiltered.forEach(element => {
        if (object[element.startdate.getDate()] == undefined){ object[element.startdate.getDate()] = {}; }
        if (object[element.startdate.getDate()][element.startdate.getTime()] == undefined) {
          object[element.startdate.getDate()][element.startdate.getTime()] = [];
        }
        object[element.startdate.getDate()][element.startdate.getTime()].push(element);
      });
      return object;
  }


  getEventsByDayTimes(dates: any): Event[]{
    let list:Event[] = [];
    dates.forEach(element => {
          let date = new Date(element);
           list = list.concat(eventsList.filter(item => item.startdate.getTime() == date.getTime() ));
    });
    return list;
  }


  filter_events(filter): Event[]{

    let path_filters = Object.keys(filter.by_path).filter(item => { return filter.by_path[item].checked; });
    let type_filters = Object.keys(filter.by_type).filter(item => { return filter.by_type[item].checked; });

    return eventsList.filter(function (item) {
      return (filter.by_day === item.startdate.getDate() || filter.by_day === 'all') &&
      (path_filters.length === 0 ? true : item.path ? path_filters.includes(item.path.slug) : false) &&
        (type_filters.length === 0 ? true : type_filters.includes(item.get_event_slug));
      }

    );
  }

  getUniqueTimesByDay(dates: any): Date[]{
    if (eventsList) {
      let uniqueDates: Date[] = [];
      let allDates: Date[] = [];

      dates.forEach(element => {
        uniqueDates = [];
        let date = new Date(element);
        for (let item of eventsList.filter(
          item => item.startdate.getDate() === date.getDate() && item.startdate.getMonth() === date.getMonth()
          )){
          let event: Event = item;
            if (!uniqueDates.find(item => item.getTime() === event.startdate.getTime() )){
                uniqueDates.push(event.startdate);
            }
        }
        allDates = allDates.concat(uniqueDates);
        });
      return allDates;


    }
    else {
        return null;
    }
  }

    private extractEvents(res: Response): Event[] {

    const offset = new Date().getTimezoneOffset();
    const body = res.json();

    const events: Event[] = [];
    for (let i = 0; i < body.length; i++) {

          let eventTypeClass = "eventtype-empty";
          let slug = 'empty';

          if (body[i].get_event_slug != null) {
            eventTypeClass = "eventtype-" + body[i].get_event_slug;
            slug = body[i].get_event_slug;
         }

          let path = null;

          if (body[i].path) {
            path = {
              title: this._translate.currentLang === 'ru' ? body[i].path.title : body[i].path.title_en,
              slug: body[i].path.slug
            };
          }
          let room = null;
          if (body[i].room) {
            room = {
              title: this._translate.currentLang === 'ru' ? body[i].room.title : body[i].room.title_en,
              slug: body[i].room.slug,
            };
          }

         const startdate = new Date(body[i].startdate);
         const enddate = new Date(body[i].enddate);
         startdate.setMinutes(startdate.getMinutes() + offset.valueOf());
         enddate.setMinutes(enddate.getMinutes() + offset.valueOf());
          const event: Event = new Event(
            body[i].id,
            this._translate.currentLang === 'ru' ? body[i].title : body[i].title_en,
            this._translate.currentLang === 'ru' ? body[i].description : body[i].description_en,
            body[i].get_speakers,
            startdate,
            enddate,
            eventTypeClass,
            // body[i].get_type_display,
            this._translate.currentLang === 'ru' ? body[i].get_type_display : body[i].get_type_display_en,
            body[i].get_line_of_work_slug,
            slug,
            body[i].room,
            path
            );

          event.get_speakers = event.get_speakers.filter(user => user.get_type_display !== 'Участник');
          events.push(event);
    }

    eventsList = events;
    return events;
  }


  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    const customMsg = 'Нет такой страницы!';
    return Observable.throw(customMsg);
  }
}
