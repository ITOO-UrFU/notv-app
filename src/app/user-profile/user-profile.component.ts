import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { AuthenticationService } from 'app/services/auth.service';
import { RegisterService} from 'app/services/register.service';
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
              private registerService: RegisterService
              ) {   
           
          /* this.registerService.getProfile().subscribe(userProfile => {
                  this.userProfile = userProfile;
                  let photo_src = "http://placehold.it/200x200"
                  if(this.userProfile.photo_url){
                      photo_src=this.userProfile.photo_url
                  }
                  this.userProfile.photo_url  = photo_src;
 
            });*/
  }

  ngOnInit() {
        this.router.navigate(["profile", "edit"]);
     /*    this.registerService.getProfile().subscribe(userProfile => {
            this.userProfile = userProfile;
           
        });*/
  }
    logout(){
       this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
    
}
