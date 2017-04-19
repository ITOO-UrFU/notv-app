import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/user';
import { AuthenticationService } from 'app/services/auth.service';
import { RegisterService} from 'app/services/register.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    constructor(
                private router: Router,
                private authenticationService: AuthenticationService,
                private registerService: RegisterService,
                private title: Title,
    ) {
    }

  ngOnInit() {
        // this.title.setTitle("Ваш профиль");
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
