import {Pipe, PipeTransform} from '@angular/core';
import { Injectable } from '@angular/core';

@Pipe({
    name: 'eventsToObject',
})

@Injectable()
export class eventsToObjectPipe implements PipeTransform {

transform(dict: Object): any {
    let a = [];
    for (const key in dict) {
      if (dict.hasOwnProperty(key)) {
        a.push({key: key, val: dict[key]});
      }
    }
    return a.sort(function(c, b) {return c.key - b.key; });
  }
}