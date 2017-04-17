import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from 'app/services/auth.service';
import { AlertService } from 'app/services/alert.service';
import { Title } from '@angular/platform-browser';
import { AuthGuard } from 'app/services/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    model: any = {};
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private title: Title,
        private authGuard: AuthGuard,
        private activatedRoute: ActivatedRoute
       ) { }

    ngOnInit() {
      if (this.authGuard.canActivate()){
            this.router.navigate(['profile', 'my']);
      }
      else {
        this.title.setTitle("Вход");
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'events';
                  this.activatedRoute.queryParams.subscribe(
                    data => {
                        if(data['reset']){
                              this.alertService.success('Пароль успешно изменен.', true);
                        }
                    }
                );

      }
    }

    login() {

        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    window.location.reload();
                    this.router.navigate([this.returnUrl]);

                },
                error => {
                    this.alertService.error("Ошибка при входе. Проверьте правильность введенных данных.");
                });
    }
    logout() {
       this.authenticationService.logout();
    }

}
