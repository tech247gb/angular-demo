import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginToken:any;
  constructor() { }

  ngOnInit(): void {
    this.loginToken=localStorage.getItem('token');
  }
  ngAfterViewInit(){
    this.loginToken=localStorage.getItem('token');
    console.log('hsadghsa');
  }
  logout(){
    localStorage.removeItem('token');
    this.loginToken=null;
  }


}
