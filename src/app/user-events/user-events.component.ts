import { Component, OnInit, OnChanges } from '@angular/core';
import { RegisterService} from 'app/services/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'app/events/events.service';
import { Event } from 'app/events/event';
import { AuthGuard } from 'app/services/auth.guard';
import { AlertService } from 'app/services/alert.service';
import { AuthenticationService } from 'app/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'div.app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss']
})
export class UserEventsComponent implements OnInit, OnChanges {
    currentUser: any =  {};
    userEvents: any[];
    eventsGrid: any = {};
    objectKeys = Object.keys;

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private alertService: AlertService,
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute,
    private authGuard: AuthGuard,
    private authenticationService: AuthenticationService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle("Мои мероприятия");
          if(this.authGuard.canActivate()) {
            this.update();
          }
          else{
             this.router.navigate(["login"]);
          }
  }

  update() {
     this.registerService.getProfile().subscribe(userProfile => {
             this.currentUser = userProfile;
             // console.log(this.currentUser);
             this.userEvents =  this.registerService.extractEvents(userProfile.get_events);
             console.log(this.userEvents);
             this.eventsGrid = this.eventsService.eventsListToObject(this.userEvents);
        },
              error => { this.authenticationService.logout(); });
  }


  ngOnChanges(changes: any) {
      if (this.userEvents) {
        //this.timeGrid = this.eventsService.getEventsObject(this.typeFilter);
      }

  }

}
