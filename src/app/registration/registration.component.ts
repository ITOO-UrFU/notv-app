import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService} from 'app/services/user-service.service';

import { AlertService } from 'app/services/alert.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

model: any = {};

  constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

  ngOnInit() {
  }

      register() {
        this.userService.create(this.model)
            .subscribe(
                data => {
                   this.alertService.success('Registration successful', true);
                    console.log("register ok!");
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                   // this.loading = false;
                   console.log("register ne ok!");
                });
    }

}
