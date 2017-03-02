import {Pipe, PipeTransform} from '@angular/core';
import { Injectable } from '@angular/core';

@Pipe({
    name: 'eventsByDate',
})

@Injectable()
export class EventsFilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any[] {
       let date = new Date(args.toString());
       return items.sort(function(a,b){return a.startdate.getTime() - b.startdate.getTime()}).filter(item => 
       item.startdate.getDate() == date.getDate() &&  item.startdate.getMonth() == date.getMonth() 
       );
    }
}