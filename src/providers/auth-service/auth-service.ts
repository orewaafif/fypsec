import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

//DON'T FORGET TO CHANGE FOR DEVELOPMENT AND TESTING
// let apiUrl = 'http://1416561.iium.acme.my/FYP-Slim-Restful/api/';
// let apiUrl = 'http://localhost/FYP-Slim-Restful/api/';
let apiUrl = 'http://mahallahrs.com/FYP-Slim-Restful/api/';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {

  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(apiUrl + type, JSON.stringify(credentials),
    {headers: headers})
    .subscribe(res => {
      resolve(res.json());
    }, (err) => {
      reject(err);
    });
  });

  }

}
