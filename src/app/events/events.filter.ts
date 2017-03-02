import {Pipe, PipeTransform} from '@angular/core';
import { Injectable } from '@angular/core';

@Pipe({
    name: 'eventsByDate',
})

@Injectable()
export class EventsFilterPipe implements PipeTransform {
    transform(items: any[], arg1: any[], arg2: any[]): any[] {
       let date = new Date(arg1.toString());
       console.log(arg2);
       return items
                    .sort(function(a,b){return a.startdate.getTime() - b.startdate.getTime()})
                    .filter(
                            item => item.startdate.getDate() == date.getDate() && item.startdate.getMonth() == date.getMonth()
                            );
    }
} 