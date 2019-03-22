import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from 'app/services/register.service';

import {AlertService} from 'app/services/alert.service';
import {AuthenticationService} from 'app/services/auth.service';
import {Title} from '@angular/platform-browser';
import {AuthGuard} from 'app/services/auth.guard';

@Component({
  selector: 'app-register-students',
  templateUrl: './register-students.component.html',
  styleUrls: ['./register-students.component.scss']
})
export class RegisterStudentsComponent implements OnInit {

model: any = {};
previousUrl: string;

  constructor(
        private router: Router,
        private registerService: RegisterService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private title: Title,
        private authGuard: AuthGuard,
        private activatedRoute: ActivatedRoute
        ) {}

  ngOnInit() {
      if (this.authGuard.canActivate()){
            this.router.navigate(['profile', 'edit']);
      }
      else {
          this.title.setTitle("Регистрация");
      }
  }

      register() {
        this.registerService.createStudent(this.model)
            .subscribe(
                data => {
                  // this.alertService.success('Registration successful', true);
                 this.authenticationService.login(this.model.email, this.model.password1).subscribe(data => {
                   this.router.navigate(['events', 'my_events']);
                 }, error => {});
                },
                error => {
                  console.log(error);
                  this.alertService.error('Ошибка при регистрации.', error);
                });
    }

}

