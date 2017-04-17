import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/auth.service';
import { AlertService } from 'app/services/alert.service';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

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
              private alertService: AlertService
              ) { }

  ngOnInit() {
    this.title.setTitle("Восстановление пароля");
  }

    resetPasswod(){
          this.authenticationService.resetPassword(this.model.email).subscribe(
                data => {
                    this.alertService.success('Новый пароль отправлен на Ваш электронный адрес.', true);
                   // this.router.navigate(['/login'], { queryParams: { reset: true } });
                },
                error => {
                    window.scrollTo(0, 0);
                    this.alertService.error("Ошибка при восстановлении пароля!", error);
                });
    }

}
