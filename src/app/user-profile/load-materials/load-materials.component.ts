import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { RegisterService } from 'app/services/register.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'div.app-load-materials',
  templateUrl: './load-materials.component.html',
  styleUrls: ['./load-materials.component.scss']
})
export class LoadMaterialsComponent implements OnInit {

    model: any = {};
    filesList: any[] = [];
    @Input() currentUser: any ;

    constructor( private http: Http, private registerService: RegisterService) { }

    ngOnInit() {
        this.update();
    }

    update() {
            this.registerService.getProfile().subscribe(userProfile => {
                this.currentUser = userProfile;
            });
    }

    fileChange(event) {
        console.log(event);
        const fileList: FileList = event.target[0].files;
        console.log(fileList);
        if (fileList.length > 0) {
            const file: File = fileList[0];
            const formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);
        this.http.post('https://openedu.urfu.ru/edcrunch/api/v1/docs/upload/', formData, this.jwt())
                .map(res => res.json())
                .catch(error => Observable.throw(error))
                .subscribe(
                    data => { console.log('success');  this.update(); },
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
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    private extractData(res: Response) {
        return res.status || 500;
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        errMsg =  error.status || 500;
        console.error('I can not delete this: ' + errMsg);
        return Promise.resolve(errMsg);
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
