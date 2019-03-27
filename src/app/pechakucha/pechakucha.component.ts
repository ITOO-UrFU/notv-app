import {Component, OnInit, Input} from '@angular/core';
import {User} from 'app/user';
import {AuthenticationService} from 'app/services/auth.service';
import {RegisterService} from 'app/services/register.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {TranslateService} from 'app/translate/translate.service';
import {AuthGuard} from 'app/services/auth.guard';
import {PechaKuchaService} from 'app/services/pechakucha.service';
import {Observable} from 'rxjs/Observable';
import {Headers, Http, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-pechakucha',
  templateUrl: './pechakucha.component.html',
  styleUrls: ['./pechakucha.component.scss']
})

export class PechaKuchaComponent implements OnInit {

  currentUser: User;
  userProfile: any;
  currentUserEmail = '';
  isLogged: boolean = false;
  participation_type: string;
  show_presentation_upload_block: boolean = false;
  pechakucha: any;
  accept_pechakucha: boolean = false;
  is_choiced: boolean = false;
  current_file = '';
  showSuccess: boolean = false;

  file: any;
  //
  constructor(
    private http: Http,
    private router: Router,
    private authenticationService: AuthenticationService,
    private registerService: RegisterService,
    private title: Title,
    private _translate: TranslateService,
    private authGuard: AuthGuard,
    private pechaKuchaService: PechaKuchaService,
  ) {
  }


  ngOnInit() {
    this.title.setTitle('PechaKucha');
    this.isLogged = this.authGuard.is_logged();
    // console.log(this.isLogged);
    if (this.isLogged) {
      this.registerService.getProfile().subscribe(userProfile => {
          // console.log('this.currentUser', userProfile);
          this.currentUser = userProfile;
          this.currentUserEmail = JSON.parse(localStorage.getItem('currentUser') || null).user.email;
          // console.log(this.currentUser);

          this.pechaKuchaService.pechaKucha().subscribe(kucha => {
              console.log(kucha);
              this.participation_type = kucha.pk_status;
              if (this.participation_type === 'a') this.show_presentation_upload_block = true;
              if (kucha.pk_accept) {
                this.accept_pechakucha = true;
              }
              if (kucha.pk_presentation_file){
                this.file = {
                  pk_presentation_file: kucha.pk_presentation_file,
                  pk_presentation_title: kucha.pk_presentation_title
                };
              }
            },
            error => {
              console.log('error', error);
            });
        },
        error => {
          this.authenticationService.logout();
        }
      );
    }
  }

  registerAtPechaKucha() {
    this.pechaKuchaService.registerPechaKucha().subscribe(pecha => {
        this.participation_type = pecha.pk_status;
        this.accept_pechakucha = true;
      },
      error => {
        console.log('err registerAtPechaKucha');
      }
    );
  }

  unregisterAtPechaKucha(){
    if(confirm("Вы уверены, что хотите отказаться от участия в мероприятии?")) {
      this.pechaKuchaService.unregisterPechaKucha().subscribe(pecha => {
          console.log('Отказано в печекуче', pecha);
          this.accept_pechakucha = false;
        },
        error => {
          console.log('err unregisterAtPechaKucha');
        }
      );
    }
  }
  public choiced(fileInput: any) {
    console.log("public choiced", fileInput.target.files);
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.is_choiced = true;
      this.current_file = (<HTMLInputElement>document.querySelector('input.file-input')).value.replace(/^.*[\\\/]/, '');
    }
    else{
      this.is_choiced = false;
    }
  }
  fileChange(event) {
    const fileList: FileList = event.target[0].files;
    console.log(fileList);
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      this.http.post('https://openedu.urfu.ru/edcrunch/api/v1/pechakucha/presentation_add', formData, this.jwt())
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
          data => {
            // this.update();
            // this.registerAtPechaKucha;
            (<HTMLInputElement>document.querySelector('input.file-input')).value = '';
            this.is_choiced = false;
            this.showSuccess = true;
            this.file = {
              pk_presentation_file: data.presentation.url,
              pk_presentation_title: data.presentation.filename
            };
            // console.log(data);
            setTimeout(function(){ this.showSuccess = false;}.bind(this), 7000);
          },
          error => { console.log(error); }
        );
    }
  }

  public toRegister() {
    this.router.navigate(['login']);
  }

  handleChange(evt) {
    console.log(this.participation_type);
    // setParticipationType
    this.pechaKuchaService.setParticipationType(this.participation_type).subscribe(setPT => {
      console.log(setPT);
      },
      error => {
        console.log('err handleChange');
      });

    if (this.participation_type === 'a') {
      this.show_presentation_upload_block = true;
    } else {
      this.show_presentation_upload_block = false;
    }
  }

  private jwt() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new Headers({
        'Authorization': currentUser.token,
        'Accept': 'application/json',
      });
      return new RequestOptions({ headers: headers });
    }
  }

}
