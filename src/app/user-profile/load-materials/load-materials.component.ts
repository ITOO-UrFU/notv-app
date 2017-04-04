import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'div.app-load-materials',
  templateUrl: './load-materials.component.html',
  styleUrls: ['./load-materials.component.scss']
})
export class LoadMaterialsComponent implements OnInit {

model: any = {};

constructor( private http: Http ) { }

  ngOnInit() {
  }

fileChange(event) {
     console.log(event);
   let fileList: FileList = event.target[0].files;
console.log(fileList);
    if (fileList.length > 0) {
        let file: File = fileList[0];
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
       this.http.post('http://127.0.0.1:8020/edcrunch/api/v1/docs/upload/', formData, this.jwt())
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
                data => console.log('success'),
                error => console.log(error)
            );
    }
}

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token,
                                        'Accept': 'application/json',
                                      });
            return new RequestOptions({ headers: headers });
        }
    }

}
