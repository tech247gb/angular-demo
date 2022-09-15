import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ElementRef, AfterViewInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild("toolbar") toolbar: MatToolbar | undefined;
  @ViewChild("main") main: ElementRef | undefined;
  @ViewChild("footer") footer: ElementRef | undefined;
  title = 'preset-angular';
  loginToken:any;

  constructor(fb: FormBuilder) {
    
  }

  ngAfterViewInit(){
    this.loginToken=localStorage.getItem('token');
    //this.main.height = 100 - (this.toolbar.height + this.footer.height)
  }
  logout(){
    localStorage.removeItem('token');
    this.loginToken=null;
  }
}

