import { Component, OnInit } from '@angular/core';
import { RegisterService} from 'app/services/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'app/events/events.service';
import { Event } from 'app/events/event';
import { AuthGuard } from 'app/services/auth.guard';
import { AlertService } from 'app/services/alert.service';

@Component({
  selector: 'div.app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss']
})
export class UserEventsComponent implements OnInit {

    currentUser: any =  {};
    userEvents: any[];
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
          if(this.authGuard.canActivate()){
            this.update();
          }
          else{
             this.router.navigate(["login"]);
          }

  }

  update(){
     this.registerService.getProfile().subscribe(userProfile => {
             this.currentUser = userProfile;
             this.userEvents =  this.registerService.extractEvents(userProfile.get_events);
             console.log(this.userEvents );
        });
  }

}
