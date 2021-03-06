import { User } from 'app/user';

export class Event {
    public id: string;
    public title: string;
    public description: string;
    public get_speakers: any[];
    public startdate: Date;
    public enddate: string;
    public eventtypeid: string;
    public eventtype: string;
    public get_line_of_work_slug: string;
    public get_event_slug: string;
    public room: any;
    public path: any;
    public translation;

    constructor(id, title, description, get_speakers, startdate, enddate, eventtypeid, eventtype, get_line_of_work_slug, get_event_slug, room, path, translation){
        this.id = id;
        this.title = title;
        this.description = description;
        this.get_speakers = get_speakers;
        this.startdate = startdate;
        this.enddate = enddate;
        this.eventtypeid = eventtypeid;
        this.eventtype = eventtype;
        this.get_line_of_work_slug = get_line_of_work_slug;
        this.get_event_slug = get_event_slug;
        this.room = room;
        this.path = path;
        this.translation = translation;
    }

}
