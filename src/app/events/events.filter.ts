import {Pipe, PipeTransform} from '@angular/core';
import { Injectable } from '@angular/core';

@Pipe({
    name: 'eventsByDate',
})

@Injectable()
export class EventsFilterPipe implements PipeTransform {
    transform(items: any[], date: number): any[] {
       console.log(date)
       console.log(items[1].startdate.getDate())
       return items.filter(item => item.startdate.getDate() == date);
    }
}