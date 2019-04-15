import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from 'app/services/register.service';

import {AlertService} from 'app/services/alert.service';
import {AuthenticationService} from 'app/services/auth.service';
import {Title} from '@angular/platform-browser';
import {AuthGuard} from 'app/services/auth.guard';
import {TranslateService} from 'app/translate/translate.service';
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
  disable_button: boolean = false;
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
  ) {
  }

  ngOnInit() {
    if (this.authGuard.is_logged()) {
      this.activatedRoute.queryParams.subscribe(
        data => {
          if (data['newreg']) {
            this.router.navigate(['profile', 'edit'], {queryParams: {newreg: data['newreg']}});
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
    this.disable_button = true;
    // console.log();
    this.registerService.create(this.model)
      .subscribe(
        data => {
          // this.alertService.success('Registration successful', true);
          console.log('data', data);
          this.authenticationService.login(this.model.email, this.model.password1).subscribe(data => {
              window.location.reload();
            }, error => {
            console.log('login error: ', error);
          });
          this.disable_button = false;
        },
        error => {
          console.log('REG ERROR', error);
          let err_msg = this._translate.instant('register_err_label');
          if (error.email) {
            err_msg = this._translate.instant('email_label') + ': ' + error.email[0].toLowerCase();
          }
          this.scrollHelper.scrollToFirst('form-group-header');
          this.scrollHelper.doScroll();
          this.alertService.error(err_msg);
          this.disable_button = false;
        });
  }

  hideAlert() {
    this.alertService.remove();
  }
}
