import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from 'app/services/auth.service';
import { AlertService } from 'app/services/alert.service';

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
        private alertService: AlertService
       ) { }

    ngOnInit() {
        // reset login status
     //  this.authenticationService.logout();

        // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'profile/edit';
        
    }

    login() {

        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                  
                    console.log("login ok!");
                    window.location.reload();
                  //   this.router.navigate([this.returnUrl]);

                },
                error => {
                    this.alertService.error("Ошибка!");
                    console.log("login ne ok!");
                });
    }
    logout(){
       this.authenticationService.logout();
    }

}
