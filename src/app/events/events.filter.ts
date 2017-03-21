import {Pipe, PipeTransform} from '@angular/core';
import { Injectable } from '@angular/core';

@Pipe({
    name: 'eventsToObject',
})

@Injectable()
export class eventsToObjectPipe implements PipeTransform {

transform(dict: Object): any {
    var a = [];
    for (var key in dict) {
      if (dict.hasOwnProperty(key)) {
        a.push({key: key, val: dict[key]});
      }
      
    }
 //   console.log(a);
    return a;
  }
} 