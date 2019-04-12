import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/user';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

let speakersList: any[];

@Injectable()
export class SpeakersService {

  private speakersUrl = 'https://openedu.urfu.ru/edcrunch/api/v1/speakers/';

  constructor( private http: Http ) { }

  getSpeakersList (): Observable<any> {
    return this.http.get(this.speakersUrl)
                    .map(this.extractSpeakers)
                    .catch(this.handleError);
  }


private extractSpeakers(res: Response): any[]{
    let body = res.json();
    console.log(body);
    let speakers: any[] = [];
    for (let i = 0; i < body.length; i++) {
          let photo_src = "http://placehold.it/200x200"
          if(!body[i].photo_url){
            body[i].photo_url = photo_src 
          }
          //let speaker:any = new User(body[i].id, body[i].first_name, body[i].last_name, body[i].second_name, body[i].biography, body[i].alt_email, photo_src ); 
          speakers.push(body[i]);
    }
    speakersList = speakers;
    return speakers;
  }

    private handleError (error: Response | any) {
    let errMsg: string;
    console.log('Speakers getting error');
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return errMsg;
  }

}
