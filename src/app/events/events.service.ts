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

private extractEvent(res: Response):Event {
    const body = res.json();
    let eventTypeClass = "eventtype-empty";
    if ( body.get_event_slug != null ) { eventTypeClass = "eventtype-" + body.get_event_slug; }
    const event: Event = new Event(
          body.id,
          body.title,
          body.description,
          body.get_speakers,
          new Date(body.startdate),
          body.enddate,
          eventTypeClass,
          body.get_type_display,
          body.block
      );

    event.get_speakers  = event.get_speakers.filter(user =>  user.get_type_display !== "Участник" );
    return event;
  }

  getEventsByType(type: string): any[]{
    //console.log(type);
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

  getEventsObject(type: string): any{
      let object: any =  {};
      let arr = [];

      let eventListFiltered = this.getEventsByType(type);

     // console.log("eventListFiltered", eventListFiltered);

      eventListFiltered.map(element => {return element.startdate}).forEach(element => {
        if(arr.map(el => el.toString()).indexOf(element.toString()) == -1) { 
          if(object[element.getDate()] == undefined){ object[element.getDate()] = []};
          object[element.getDate()].push(element);
          arr.push(element)
        }
      });
      object={};
      eventListFiltered.forEach(element => {
        if(object[element.startdate.getDate()] == undefined){ object[element.startdate.getDate()] = {}}
        if(object[element.startdate.getDate()][element.startdate.getTime()] == undefined){
          object[element.startdate.getDate()][element.startdate.getTime()] =[]
        }
        object[element.startdate.getDate()][element.startdate.getTime()].push(element)
      });
      
      /*
      element.startdate.getHours()+':'+element.startdate.getMinutes() <=> element.startdate.getTime()
      */
      
      return object; 
  }




  getEventsByDayTimes(dates: any): Event[]{
    let list:Event[] = [];
    dates.forEach(element => {
          let date = new Date(element);
           list = list.concat(eventsList.filter(item => item.startdate.getTime() == date.getTime() ));
    })
    return list;
  }


  getUniqueTimesByDay(dates: any): Date[]{
    if(eventsList){


      let uniqueDates:Date[] = [];
      let allDates:Date[] = [];

      dates.forEach(element => {
        uniqueDates = [];
        let date = new Date(element);
        for(let item of eventsList.filter(item => item.startdate.getDate() == date.getDate() && item.startdate.getMonth() == date.getMonth())){
          let event: Event = item;
            if(!uniqueDates.find(item => item.getTime() === event.startdate.getTime() )){
                uniqueDates.push(event.startdate);
            }
        }
        allDates = allDates.concat(uniqueDates);
        })
      //uniqueDates.sort(function(a,b){return a.getTime() - b.getTime()});
      return allDates;


    }
    
    else{
        return null;
    }
  }

    private extractEvents(res: Response): Event[] {
    const body = res.json();
    const events: Event[] = [];
    for (let i = 0; i < body.length; i++) {
          let eventTypeClass = "eventtype-empty";
          if (body[i].get_event_slug != null) { eventTypeClass = "eventtype-" + body[i].get_event_slug; }
          const event: Event = new Event(
            body[i].id,
            body[i].title,
            body[i].description,
            body[i].get_speakers,
            new Date(body[i].startdate),
            body[i].enddate,
            eventTypeClass,
            body[i].get_type_display,
            body[i].get_line_of_work_slug
            );

          event.get_speakers = event.get_speakers.filter(user => user.get_type_display !== 'Участник');
          events.push(event);
    }

    eventsList = events;
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

    const customMsg = 'Нет такой страницы!';
    return Observable.throw(customMsg);
  }
}
