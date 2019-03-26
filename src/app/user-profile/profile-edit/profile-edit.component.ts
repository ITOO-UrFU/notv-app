import { Component, OnInit } from '@angular/core';
import { RegisterService} from 'app/services/register.service';
import { Router } from '@angular/router';
import { AlertService } from 'app/services/alert.service';
import { ActivatedRoute} from '@angular/router';
import { AuthenticationService } from 'app/services/auth.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'app/translate/translate.service';
import {Location} from '@angular/common';

@Component({
  selector: 'div.app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
    model: any = {};
    currentUser: any =  {};
    currentUserEmail = '';
    userEvents: Event[];

    showNewRegister: boolean = false;

  constructor(
        private router: Router,
        private registerService: RegisterService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute,
        private title: Title,
        private _translate: TranslateService
        ) {
            activatedRoute.queryParams.subscribe(
            (queryParam: any) => {
                if (queryParam['newreg']) {
                    this.showNewRegister = true;
                }
            }
        );

         }



  ngOnInit() {
      this.title.setTitle(this._translate.instant('edit_profile_title_label'));
            this.registerService.getProfile().subscribe(userProfile => {

            this.currentUser = userProfile;
            let photo_src = 'http://placehold.it/200x200';
            if (this.currentUser.photo_url) {
                photo_src = this.currentUser.photo_url;
            }
            this.currentUser.photo_url  = photo_src;
            this.currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || null ).user.email;
            this.userEvents = this.currentUser.get_events;
        },
              error => { this.authenticationService.logout(); }
        );
  }
  hideAlert() {
    this.alertService.remove();
  }
update() {
        this.registerService.update(this.model)
            .subscribe(
                data => {
                 this.alertService.success(this._translate.instant('changes_saved_label'), true);
                 //window.location.reload();
                 window.scrollTo(0, 0);
                },
                error => {
                    window.scrollTo(0,0);

                    this.alertService.error(this._translate.instant('profile_sve_err_msg'), error);
                });
    }

    toNewRegiser(){
      this.authenticationService.logout();
      this.router.navigate(['/register']);
    }
}
