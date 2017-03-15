import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { AuthenticationService } from 'app/services/authentication.service';
import { UserService} from 'app/services/user-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    currentUser: User;
    userProfile: any;
  constructor(
              private router: Router, 
              private authenticationService: AuthenticationService,
              private userService: UserService
              ) {   
            this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
            console.log(this.currentUser); 
  }

  ngOnInit() {
         this.userService.getProfile().subscribe(userProfile => {
            this.userProfile = userProfile;
            console.log("!!!!!!!!!!", this.userProfile);
        });
  }
    logout(){
       this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
