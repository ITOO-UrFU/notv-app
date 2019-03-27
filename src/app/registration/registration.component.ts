import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from 'app/services/register.service';

import {AlertService} from 'app/services/alert.service';
import {AuthenticationService} from 'app/services/auth.service';
import {Title} from '@angular/platform-browser';
import {AuthGuard} from 'app/services/auth.guard';
import { TranslateService } from 'app/translate/translate.service';
import {Location} from '@angular/common';
import {ScrollHelper} from 'app/helpers';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

model: any = {};
previousUrl: string;
private scrollHelper: ScrollHelper = new ScrollHelper();

  constructor(
        private router: Router,
        private registerService: RegisterService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private title: Title,
        private authGuard: AuthGuard,
        private activatedRoute: ActivatedRoute,
        private _translate: TranslateService,

        ) {}

  ngOnInit() {
      if (this.authGuard.is_logged()){
          this.activatedRoute.queryParams.subscribe(
                    data => {
                        if (data['newreg']){
                                this.router.navigate(['profile', 'edit'], { queryParams: { newreg: data['newreg'] } });
                        } else {
                            this.router.navigate(['profile', 'edit']);
                        }
                    },
                    nodata => {
                        this.router.navigate(['profile', 'my']);
                    }
                );
      } else {
        this.title.setTitle(this._translate.instant('register_label'));
      }


  }

      register() {
        this.registerService.create(this.model)
            .subscribe(
                data => {
                  // this.alertService.success('Registration successful', true);
                  console.log("data", data);
                  this.authenticationService.login(this.model.email, this.model.password1).subscribe(data => {}, error => {});
                },
                error => {
                  console.log("REG ERROR", error);
                  let err_msg = this._translate.instant('register_err_label');

                  if(error.email){
                    err_msg = this._translate.instant('email_label') + ": " + error.email[0].toLowerCase();
                  }
                  this.scrollHelper.scrollToFirst('form-group-header');
                  this.scrollHelper.doScroll();
                  // let err_msg = "lal"; // JSON.parse(error._body).email[0] === "Это поле обязательно." ? "" : "\n " + JSON.parse(error._body).email[0];
                  this.alertService.error(err_msg);
                });
    }

  hideAlert() {
    this.alertService.remove();
  }
}
