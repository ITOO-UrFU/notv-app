import { Component, OnInit } from '@angular/core';
import { RegisterService} from 'app/services/register.service';
import { Router } from '@angular/router';
import { AlertService } from 'app/services/alert.service';
import { ActivatedRoute} from '@angular/router';
import { AuthenticationService } from 'app/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'div.app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
    model: any = {};
    currentUser: any =  {};
    currentUserEmail = '';
    userEvents: Event[];

    showNewRegister: boolean = false;

  constructor(
        private router: Router,
        private registerService: RegisterService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute,
        private title: Title,
        ) {
            activatedRoute.queryParams.subscribe(
            (queryParam: any) => {
                if (queryParam['newreg']) {
                    this.showNewRegister = true;
                }
            }
        );

         }



  ngOnInit() {
      this.title.setTitle("Редактирование профиля");
            this.registerService.getProfile().subscribe(userProfile => {

            this.currentUser = userProfile;
            let photo_src = 'http://placehold.it/200x200';
            if (this.currentUser.photo_url) {
                photo_src = this.currentUser.photo_url;
            }
            this.currentUser.photo_url  = photo_src;
            this.currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || null ).user.email;
            this.userEvents = this.currentUser.get_events;
        },
              error => { this.authenticationService.logout(); }
        );
  }

update() {
        this.registerService.update(this.model)
            .subscribe(
                data => {
                 this.alertService.success('Изменения сохранены.', true);
                 //window.location.reload();
                 window.scrollTo(0, 0);
                },
                error => {
                    window.scrollTo(0,0);

                    this.alertService.error("Ошибка при сохранении данных!", error);
                });
    }

    toNewRegiser(){
      this.authenticationService.logout();
      this.router.navigate(['/register']);
    }
}
