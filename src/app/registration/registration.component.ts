import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService} from 'app/services/register.service';

import { AlertService } from 'app/services/alert.service';
import { AuthenticationService } from 'app/services/auth.service';
import { Title } from '@angular/platform-browser';
import { AuthGuard } from 'app/services/auth.guard';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

model: any = {};

  constructor(
        private router: Router,
        private registerService: RegisterService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private title: Title,
        private authGuard: AuthGuard,
        ) { }

  ngOnInit() {
      if (this.authGuard.canActivate()){
            this.router.navigate(['profile']);
      }
      else {
          this.title.setTitle("Регистрация");
      }

  }

      register() {
        this.registerService.create(this.model)
            .subscribe(
                data => {
                  // this.alertService.success('Registration successful', true);
                    console.log("register ok!", this.model.password1);
              this.authenticationService.login(this.model.email, this.model.password1).subscribe(data => {}, error => {});
                },
                error => {
                    this.alertService.error("Ошибка!");
                    console.log("register ne ok!");
                });
    }

}
