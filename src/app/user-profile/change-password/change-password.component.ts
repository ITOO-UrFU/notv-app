import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/auth.service';
import { AlertService } from 'app/services/alert.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    model: any = {};
  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle("Изменение пароля");
  }

    newPasswod(){
          this.authenticationService.changePassword(this.model.password_old, this.model.password1, this.model.password2).subscribe(
                data => {
                  // console.log(data.json())
                //  if("Пароль неверен" == data.json())
                 this.alertService.success('Пароль успешно изменен.', true);
                 window.scrollTo(0, 0);
                },
                error => {
                    window.scrollTo(0, 0);
                    var errorMgs = "Ошибка";
                    if (error.status == 452){
                      errorMgs = "Новые пароли не совпадают, либо пусты!";
                    }
                    if (error.status == 450) {
                      errorMgs = "Старый пароль введен неверно!";
                    }
                    this.alertService.error(errorMgs, error);
                });
      }
    }

