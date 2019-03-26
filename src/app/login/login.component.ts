import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from 'app/services/auth.service';
import { AlertService } from 'app/services/alert.service';
import { Title } from '@angular/platform-browser';
import { AuthGuard } from 'app/services/auth.guard';
import { TranslateService } from 'app/translate/translate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    model: any = {};
    returnUrl: string;
    showPassReset: boolean = false;
    alertExists: boolean = true;

   constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private title: Title,
        private authGuard: AuthGuard,
        private activatedRoute: ActivatedRoute,
        private _translate: TranslateService
       ) {
          activatedRoute.queryParams.subscribe(
            (queryParam: any) => {
                if (queryParam['reset']) {
                    this.showPassReset = true;
                    this.model.email = queryParam['reset']
                }
            }
        );
       }

  // private removeAlert(): void {
  //   this.alertService.
  // }

    ngOnInit() {

      if (this.authGuard.canActivate()){
            this.router.navigate(['profile', 'my']);
      }
      else {
        this.title.setTitle(this._translate.instant('login_msg'));
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'events';
      }
    }

    login() {

        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    window.location.reload();
                  // this.router.navigate([this.returnUrl]);
                  this.router.navigate(['/profile/my']);


                },
                error => {
                  // this.deleteHandler();
                    // this.alertService.error("Ошибка при входе. Проверьте правильность введенных данных.");
                  // this.alertExists = true;

                  this.alertService.error(this._translate.instant('login_error_msg'));
                });
    }
    logout() {
       this.authenticationService.logout();
    }

    hideBlock(){
        this.alertService.remove();
        this.showPassReset = false;
    }

}
