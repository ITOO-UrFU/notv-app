import {Component, OnInit, Input} from '@angular/core';
import {User} from 'app/user';
import {AuthenticationService} from 'app/services/auth.service';
import {RegisterService} from 'app/services/register.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {TranslateService} from 'app/translate/translate.service';
import {AuthGuard} from 'app/services/auth.guard';

@Component({
  selector: 'app-pechakucha',
  templateUrl: './pechakucha.component.html',
  styleUrls: ['./pechakucha.component.scss']
})

export class PechaKuchaComponent implements OnInit {

  currentUser: User;
  userProfile: any;
  currentUserEmail = '';
  isLogged: boolean = false;
  participation_type: string = 'L';
  show_presentation_upload_block: boolean = false;

  //
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private registerService: RegisterService,
    private title: Title,
    private _translate: TranslateService,
    private authGuard: AuthGuard,
  ) {
  }


  ngOnInit() {
    this.title.setTitle('PechaKucha');
    this.isLogged = this.authGuard.is_logged();
    console.log(this.isLogged);


    if (this.isLogged) {
      this.registerService.pechaKucha().subscribe(kucha => {
          console.log(kucha);
        },
        error => {
          console.log('error', error);
        });

      this.registerService.getProfile().subscribe(userProfile => {
          console.log('this.currentUser', userProfile);
          this.currentUser = userProfile;
          this.currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || null).user.email;
          console.log(this.currentUser);

        },
        error => {
          // this.currentUser = false;
          // console.log("err current usr");
          this.authenticationService.logout();
        }
      );
    }

    // console.log(this.currentUser);

  }

  registerAtPechaKucha() {
    this.registerService.registerPechaKucha().subscribe(pecha => {
        console.log('pecha', pecha);
      },
      error => {
        console.log('err current pecha');
      }
    );
  }

  public toRegister() {
    this.router.navigate(['login']);
  }

  handleChange(evt) {
    console.log(this.participation_type);
    if (this.participation_type === 'A') {
      this.show_presentation_upload_block = true;
    } else {
      this.show_presentation_upload_block = false;
    }
  }
}
