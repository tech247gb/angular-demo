import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(  private http: HttpClient,) { }
  /**Login api  */
  login(credential:any): Promise<any> {
      return new Promise((resolve, reject) => {
        return this.http.post( environment.authURL+'/user',credential).subscribe((response: any) => {         
          resolve(response);   
        }, reject)
      });
  }
  /**Register */
  register(form:any):Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.post( environment.authURL+'/user-add',form).subscribe((response: any) => {
        resolve(response);
      }, reject)
    });
  }
}


