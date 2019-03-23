import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/auth.service';
import { AlertService } from 'app/services/alert.service';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from 'app/translate/translate.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    model: any = {};

  constructor(private authenticationService: AuthenticationService,
              private title: Title,
              private router: Router,
              private alertService: AlertService,
              private _translate: TranslateService
              ) { }

  ngOnInit() {
    this.title.setTitle(this._translate.instant('reset_password_label'));
  }

    resetPasswod(){
          this.authenticationService.resetPassword(this.model.email).subscribe(
                data => {
                    this.alertService.success(this._translate.instant('sent_new_pass_msg'), true);
                   this.router.navigate(['/login'], { queryParams: { reset: this.model.email } });
                },
                error => {
                    window.scrollTo(0, 0);
                    this.alertService.error(this._translate.instant('reset_pass_err_label'), error);
                });
    }

}
