export class User {
    public id: string;
    public first_name: string;
    public last_name: string;
    public second_name: string;
    public biography: string;
    public alt_email: string;
    public user_photo: string;

    constructor(id, first_name, last_name, second_name, biography, alt_email, user_photo){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.second_name = second_name;
        this.biography = biography;
        this.alt_email = alt_email;
        this.user_photo = user_photo;
    }
}