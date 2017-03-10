import { User } from 'app/user';

export class Event {
    public id: string;
    public title: string;
    public description: string;
    public users: User[];
    public startdate: Date;
    public enddate: string;
    public eventtypeid: string;
    public eventtype: string;
    
    constructor(id, title, description, users, startdate, enddate, eventtypeid, eventtype){
        this.id = id;
        this.title = title;
        this.description = description;
        this.users = users;
        this.startdate = startdate;
        this.enddate = enddate;
        this.eventtypeid = eventtypeid;
        this.eventtype = eventtype;
    }

}