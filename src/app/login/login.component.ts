import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';

import {AuthenticationService} from 'app/services/auth.service';
import {AlertService} from 'app/services/alert.service';
import {Title} from '@angular/platform-browser';
import {AuthGuard} from 'app/services/auth.guard';
import {TranslateService} from 'app/translate/translate.service';
import {NavComponent} from '../nav/nav.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl: string;
  showPassReset: boolean = false;
  disable_button: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private title: Title,
    private authGuard: AuthGuard,
    private activatedRoute: ActivatedRoute,
    private _translate: TranslateService,
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

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    if (this.authGuard.canActivate()) {
      this.router.navigate(['profile', 'my']);
    } else {
      this.title.setTitle(this._translate.instant('login_msg'));
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'events';
    }

  }

  login() {
    this.disable_button = true;
    this.authenticationService.login(this.model.email, this.model.password)
      .subscribe(
        data => {
          console.log("ok");
          window.location.reload();
        },
        error => {
          console.log("LOL")
          this.alertService.error(this._translate.instant('login_error_msg'));
        });
    this.showPassReset = false;
  }

  logout() {
    this.authenticationService.logout();
  }

  hideBlock() {
    if (!this.showPassReset) {
      this.disable_button = false;
      this.alertService.remove();
    }
    // this.showPassReset = false;
  }

}
