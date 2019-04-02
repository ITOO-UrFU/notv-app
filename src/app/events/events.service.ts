import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Event } from 'app/events/event';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

let eventsList: Event[];

@Injectable()
export class EventsService {

  private eventsUrl = 'https://openedu.urfu.ru/edcrunch/api/v1/events';

  constructor( private http: Http ) { }


  getEventsList (): Observable<Event[]> {
    let eventsList: string;
    return this.http.get(this.eventsUrl)
                    .map(this.extractEvents)
                    .catch(this.handleError);
  }

  getEvent(id: string): Observable<Event> {
    return this.http.get(this.eventsUrl + "/" + id)
                    .map(this.extractEvent)
                    .catch(this.handleError);
  }

private extractEvent(res: Response): Event {
  const offset = new Date().getTimezoneOffset();
    const body = res.json();
    // console.log(body);
    let eventTypeClass = "eventtype-empty";
    let slug = 'empty';
    if ( body.get_event_slug != null ) {
      eventTypeClass = "eventtype-" + body.get_event_slug;
      slug = body.get_event_slug;
    }
    const startdate = new Date(body.startdate);
    const enddate = new Date(body.enddate);
    startdate.setMinutes(startdate.getMinutes() + offset.valueOf());
    enddate.setMinutes(enddate.getMinutes() + offset.valueOf());
    const event: Event = new Event(
          body.id,
          body.title,
          body.description,
          body.get_speakers,
          startdate,
          enddate,
          eventTypeClass,
          body.get_type_display,
          body.block,
          slug,
          body.room,
      body.path,
      );

    event.get_speakers  = event.get_speakers.filter(user =>  user.get_type_display !== "Участник" );
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


  getEventsByDay(){
  }

  filter_events(filter): Event[]{

    let path_filters = filter.by_path.filter(item => { return item.checked; }).map(item => item.slug);
    let type_filters = filter.by_type.filter(item => { return item.checked; }).map(item => item.slug);
    // path_filters.length > 0

    console.log("path_filters", type_filters);



    return eventsList.filter(function (item) {

      // let r = filter.by_day === item.startdate.getDate() || filter.by_day === 'all' &&
      // path_filters.length === 0 ? true : item.path ? path_filters.includes(item.path.slug) : false &&
      // type_filters.length === 0 ? true : type_filters.includes(item.get_event_slug);
      //
      // console.log((filter.by_day === item.startdate.getDate() || filter.by_day === 'all')  + "_______" + (path_filters.length === 0 ? true : item.path ? path_filters.includes(item.path.slug) : false )  + "_______" + (type_filters.length === 0 ? true : type_filters.includes(item.get_event_slug)) + "=====" + r);


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
      console.log(allDates);
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
          // console.log(body[i]);
          let eventTypeClass = "eventtype-empty";
          let slug = 'empty';

          if (body[i].get_event_slug != null) { 
            eventTypeClass = "eventtype-" + body[i].get_event_slug;
            slug = body[i].get_event_slug;
         }

         const startdate = new Date(body[i].startdate);
         const enddate = new Date(body[i].enddate);
         startdate.setMinutes(startdate.getMinutes() + offset.valueOf());
         enddate.setMinutes(enddate.getMinutes() + offset.valueOf());
          const event: Event = new Event(
            body[i].id,
            body[i].title,
            body[i].description,
            body[i].get_speakers,
            startdate,
            enddate,
            eventTypeClass,
            body[i].get_type_display,
            body[i].get_line_of_work_slug,
            slug,
            body[i].room,
            body[i].path,
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
