import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/user';
import { AuthenticationService } from 'app/services/auth.service';
import { RegisterService} from 'app/services/register.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

    currentUser: User;
    userProfile: any;
    currentUserEmail = '';

    constructor(
                private router: Router,
                private authenticationService: AuthenticationService,
                private registerService: RegisterService,
                private title: Title,
                ) {
    }


  ngOnInit() {
    this.title.setTitle("Мой профиль");
            this.registerService.getProfile().subscribe(userProfile => {

            this.currentUser = userProfile;
            this.currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || null ).user.email;
        },
              error => { this.authenticationService.logout(); }
        );
  }

}