import { Component, OnInit } from '@angular/core';
import { RegisterService} from 'app/services/register.service';
import { Router } from '@angular/router';
import { AlertService } from 'app/services/alert.service';

@Component({
  selector: 'div.app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

<<<<<<< HEAD
    model: any = {};
    currentUser: any =  {};
    currentUserEmail = '';
    userEvents: Event[];
=======
model: any = {};
currentUser: any =  {};
currentUserEmail: string = "";
>>>>>>> 90e3828f470725c17590e277b37924320e5b557d

  constructor(
        private router: Router,
        private registerService: RegisterService,
        private alertService: AlertService,
        ) { }

  ngOnInit() {
            this.registerService.getProfile().subscribe(userProfile => {
<<<<<<< HEAD
            this.currentUser = userProfile;
            let photo_src = 'http://placehold.it/200x200';
            if (this.currentUser.photo_url) {
                photo_src = this.currentUser.photo_url;
            }
            this.currentUser.photo_url  = photo_src;
            this.currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || null ).user.email;
            this.userEvents = this.currentUser.get_events;
=======
                this.currentUser = userProfile;
                let photo_src = "http://placehold.it/200x200"
                if (this.currentUser.photo_url){
                    photo_src = this.currentUser.photo_url;
                }
                this.currentUser.photo_url  = photo_src;
                this.currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || null ).user.email;
>>>>>>> 90e3828f470725c17590e277b37924320e5b557d
        });
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
<<<<<<< HEAD
                    this.alertService.error('Ошибка при сохранении данных!', error);
=======
                    this.alertService.error("Ошибка при сохранении данных!", error);
>>>>>>> 90e3828f470725c17590e277b37924320e5b557d
                });
    }
}
