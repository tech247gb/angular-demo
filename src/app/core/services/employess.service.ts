import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployessService {
  private employeeListSource = new BehaviorSubject('');
  currentEmployeeList = this.employeeListSource.asObservable();

  constructor(  private http: HttpClient) { }
   headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.token}`
  })

  getEmployees(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.get(environment.globalURL+'users').subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }
  getEmployee(id:any): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.get(environment.globalURL+'users/'+id).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }
  addEmployee(data:any): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.post(environment.globalURL+'users',data).subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }
  editEmployee(data:any,item:any): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.put(environment.globalURL+'users/'+item.id,data).subscribe((response: any) => {
        console.log(response);
        resolve(response);
      }, reject);
    });
  }
  deleteEmployee(item:any): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.http.delete(environment.globalURL+'users/'+item.id).subscribe((response: any) => {
        console.log(response);
        resolve(response);
      }, reject);
    });
  }
  changeList(item:any) {
    this.employeeListSource.next(item);
  }
}
