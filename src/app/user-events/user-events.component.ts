import { Component, OnInit } from '@angular/core';
import { RegisterService} from 'app/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss']
})
export class UserEventsComponent implements OnInit {

currentUser: any =  {};
userEvents: Event[];
  constructor(        private router: Router,
        private registerService: RegisterService,) { }

  ngOnInit() {
             this.registerService.getProfile().subscribe(userProfile => {
             this.currentUser = userProfile;
             this.userEvents = this.currentUser.get_events;
             console.log(this.userEvents);

        });
  }

    public toEvent(event: Event) {
        this.router.navigate(["events", "event", event]);
    }

}
