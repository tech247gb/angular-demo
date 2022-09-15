import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(public authService:AuthService,public router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, {
        validators: Validators.compose([Validators.required]),
        updateOn: 'change',
      }),
      password: new FormControl(null, {
        validators: Validators.compose([Validators.required]),
        updateOn: 'change',
      }),
    });
  }
  async login(){
    if(this.loginForm.valid){
        let loginres=await this.authService.login(this.loginForm.value);
        console.log(loginres);
        if(loginres.length && loginres[0].token && loginres[0].password===this.loginForm.value['password']){
          localStorage.setItem('token',loginres[0].token);
          this.router.navigate(["/admin/dashboard"]);
        }else{
          
        }
    }
  }


}
