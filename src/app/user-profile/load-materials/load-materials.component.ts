import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { RegisterService } from 'app/services/register.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'div.app-load-materials',
  templateUrl: './load-materials.component.html',
  styleUrls: ['./load-materials.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoadMaterialsComponent implements OnInit {

    model: any = {};
    filesList: any[] = [];
    @Input() currentUser: any ;
    is_choiced: boolean = false;
    current_file = '';

    constructor( private http: Http, private registerService: RegisterService) { }

    ngOnInit() {
        this.update();
    }

    update() {
            this.registerService.getProfile().subscribe(userProfile => {
                this.currentUser = userProfile;
            });
    }

    public choiced(fileInput: any) {
        if (fileInput.target.files && fileInput.target.files[0]) {
                this.is_choiced = true;
                this.current_file = (<HTMLInputElement>document.querySelector('input.file-input')).value.replace(/^.*[\\\/]/, '');
                console.log("choiced ", this.current_file);

        }
    }

    fileChange(event) {
        const fileList: FileList = event.target[0].files;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            const formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);
        this.http.post('https://openedu.urfu.ru/edcrunch/api/v1/docs/upload/', formData, this.jwt())
                .map(res => res.json())
                .catch(error => Observable.throw(error))
                .subscribe(
                    data => {
                        this.update();
                        (<HTMLInputElement>document.querySelector('input.file-input')).value = '';
                        this.is_choiced = false;
                    },
                    error => { console.log(error); }
                );
        }
    }

    fileDelete(file_id: string) {
        const body = { 'file_id': file_id };
        const options = this.jwt();
        options.headers.append('content-type', 'application/json');

        this.http.post(
            'https://openedu.urfu.ru/edcrunch/api/v1/docs/delete/',
            JSON.stringify(body),
            options
            )

            .map(res => res)
            .catch(error => Observable.throw(error))
            .subscribe(
                data => { this.update(); },
                error => { console.log(error); }
            );
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
