import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';



@Injectable()

export class HttpInterceptor implements HttpInterceptor {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,PUT,OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, content-type, Authorization, authorization ",
      "Access-Control-Allow-Origin": "*",
      "vary": "Accept-Encoding"
    })
  };
  constructor( ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.getHeaders(request);
    console.log(request);
    return next.handle(request);
  }
  getHeaders(request: HttpRequest<any>): HttpRequest<any> {
      /**Add token to request header**/
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${environment.token}`,
        },
      });
    }
   
}