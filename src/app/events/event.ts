import { User } from 'app/user';

export class Event {
    public id: string;
    public title: string;
    public description: string;
    public users: User[];
    public startdate: string;
    public enddate: string;

    constructor(id, title, description, users, startdate, enddate){
        this.id = id;
        this.title = title;
        this.description = description;
        this.users = users;
        this.startdate = startdate;
        this.enddate = enddate;
    }

}