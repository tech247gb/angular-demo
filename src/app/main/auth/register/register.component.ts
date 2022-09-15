import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(public authService:AuthService,public router:Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userName: new FormControl(null, {
        validators: Validators.compose([Validators.required]),
        updateOn: 'change',
      }),
      password: new FormControl(null, {
        validators: Validators.compose([Validators.required]),
        updateOn: 'change',
      }),
    });
  }
  async register(){
    if(this.registerForm.valid){
        let registerres=await this.authService.register(this.registerForm.value);
        console.log(registerres);
    }

}

}
