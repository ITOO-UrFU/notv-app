import { Component, OnInit } from '@angular/core';
import { RegisterService} from 'app/services/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'app/events/events.service';
import { Event } from 'app/events/event';
import { AuthGuard } from 'app/services/auth.guard';
import { AlertService } from 'app/services/alert.service';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss']
})
export class UserEventsComponent implements OnInit {

  currentUser: any =  {};
  userEvents: Event[];
    currentEvent: Event;
    errorMessage: string;
    isLogged: boolean = false;
    isReg: boolean;
    showButtons:boolean = false;
    whereis: string = "trajectory";

  constructor(        
    private router: Router,
    private registerService: RegisterService,
    private alertService: AlertService,
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute,
    private authGuard: AuthGuard) { }

  ngOnInit() {
             this.registerService.getProfile().subscribe(userProfile => {
             this.currentUser = userProfile;
             this.userEvents = this.currentUser.get_events;

        });
  }


  unregisterOnEvent(id: string){
    this.registerService.unregisterOnEvent(id).subscribe(
                data => {
                 this.alertService.success('Вы отписаны от события!', true);
                    window.scrollTo(0,0);
                    window.location.reload()
                },
                error => {
                    window.scrollTo(0,0);
                    this.alertService.error("Ошибка отписки от события!", error);
                });;
       
}

    public toEvent(event: Event) {
      console.log(event.id);
        this.router.navigate(["events", "event", event.id]);
    }

}
