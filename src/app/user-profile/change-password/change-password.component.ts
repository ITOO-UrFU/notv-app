import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/auth.service';
import { AlertService } from 'app/services/alert.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'app/translate/translate.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    model: any = {};
  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService, private title: Title,
              private _translate: TranslateService) { }

  ngOnInit() {
    this.title.setTitle(this._translate.instant('change_password_title_label'));
  }
  hideAlert() {
    this.alertService.remove();
  }
    newPassword(){
          this.authenticationService.changePassword(this.model.password_old, this.model.password1, this.model.password2).subscribe(
                data => {
                 this.alertService.success(this._translate.instant('pass_successfully_changed_msg'), true);
                  // this.model.password_old = "";
                  // this.model.password1 = "";
                  // this.model.password2 = "";
                 window.scrollTo(0, 0);
                },
                error => {
                    window.scrollTo(0, 0);
                    var errorMgs = this._translate.instant('error_label');
                    if (error.status == 452){
                      errorMgs = this._translate.instant('change_pass_err_mg_1');
                    }
                    if (error.status == 450) {
                      errorMgs = this._translate.instant('change_pass_err_mg_2');
                    }
                    this.alertService.error(errorMgs, error);
                });
      }
    }

