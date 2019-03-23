import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from 'app/services/register.service';

import {AlertService} from 'app/services/alert.service';
import {AuthenticationService} from 'app/services/auth.service';
import {Title} from '@angular/platform-browser';
import {AuthGuard} from 'app/services/auth.guard';
import { TranslateService } from 'app/translate/translate.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

model: any = {};
previousUrl: string;

  constructor(
        private router: Router,
        private registerService: RegisterService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private title: Title,
        private authGuard: AuthGuard,
        private activatedRoute: ActivatedRoute,
        private _translate: TranslateService
        ) {}

  ngOnInit() {
      if (this.authGuard.canActivate()){
          this.activatedRoute.queryParams.subscribe(
                    data => {
                        if(data['newreg']){
                                this.router.navigate(['profile', 'edit'], { queryParams: { newreg: data['newreg'] } });
                        }
                        else {
                            this.router.navigate(['profile', 'edit']);
                        }
                    },
                    nodata => {
                        this.router.navigate(['profile', 'my']);
                    }
                ); 
      }
      else {
          this.title.setTitle(this._translate.instant('register_label'));
      }

  }

      register() {
        this.registerService.create(this.model)
            .subscribe(
                data => {
                  // this.alertService.success('Registration successful', true);
                  this.authenticationService.login(this.model.email, this.model.password1).subscribe(data => {}, error => {});
                },
                error => {
                  console.log(JSON.parse(error._body).email[0]);
                  this.alertService.error(this._translate.instant('register_err_label'));
                });
    }

}
