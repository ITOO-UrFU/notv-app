import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/user';
import { AuthenticationService } from 'app/services/auth.service';
import { RegisterService} from 'app/services/register.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'app/translate/translate.service';

@Component({
  selector: 'app-pechakucha',
  templateUrl: './pechakucha.component.html',
  styleUrls: ['./pechakucha.component.scss']
})

export class PechaKuchaComponent implements OnInit {

  currentUser: any;
  userProfile: any;
  currentUserEmail = '';
  //
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private registerService: RegisterService,
    private title: Title,
    private _translate: TranslateService
  ) {
  }


  ngOnInit() {
    this.title.setTitle('PechaKucha');
    this.registerService.getProfile().subscribe(userProfile => {
        console.log("this.currentUser");
        this.currentUser = userProfile;
        this.currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || null ).user.email;

      },
      error => {
      this.currentUser = false;
        // console.log("err current usr");
        this.authenticationService.logout();
      }
    );

    console.log(this.currentUser);

  }

}
