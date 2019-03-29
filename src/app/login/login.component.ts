import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { AuthenticationService } from 'app/services/auth.service';
import { AlertService } from 'app/services/alert.service';
import { Title } from '@angular/platform-browser';
import { AuthGuard } from 'app/services/auth.guard';
import { TranslateService } from 'app/translate/translate.service';
import { NavComponent } from '../nav/nav.component';

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
  disable_button: boolean = false;
    // _nav = new NavComponent();
   constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private title: Title,
        private authGuard: AuthGuard,
        private activatedRoute: ActivatedRoute,
        private _translate: TranslateService,
        // private _nav: NavComponent,
       ) {
          activatedRoute.queryParams.subscribe(
            (queryParam: any) => {
                if (queryParam['reset']) {
                    this.showPassReset = true;
                    this.model.email = queryParam['reset'];
                }
            }
        );
       }

  // private removeAlert(): void {
  //   this.alertService.
  // }

    ngOnInit() {
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
      if (this.authGuard.canActivate()){
            this.router.navigate(['profile', 'my']);
      }
      else {
        this.title.setTitle(this._translate.instant('login_msg'));
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'events';
      }

    }

    login() {
      this.disable_button = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                  // this._translate.replace('login_register_label','profile_label');
                  // this.router.navigate(['profile', 'my']);
                  // setTimeout(location.reload(true), 1000);
                  window.location.reload();
                },
              error => {
                  // this.deleteHandler();
                  // this.alertExists = true;
                this.disable_button = false;
                  this.alertService.error(this._translate.instant('login_error_msg'));
                });
      this.showPassReset = false;
    }

  // public callMe(): void {
  //   this._nav.testCall();
  // }

    logout() {
       this.authenticationService.logout();
    }

    hideBlock(){
        if(!this.showPassReset){
          this.alertService.remove();
        }
        // this.showPassReset = false;
    }

}
