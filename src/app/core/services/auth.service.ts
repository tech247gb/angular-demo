import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(  private http: HttpClient,) { }
  login(credential:any): Promise<any> {
    return new Promise((resolve, reject) => {
      if(credential.username==='admin' && credential.password==='123456'){
        resolve('success')
      }else{
        resolve('error')
      }
      // return this.http.post('', credential).subscribe((response: any) => {
      //   resolve(response);
      // }, reject);
    });
  }
}


