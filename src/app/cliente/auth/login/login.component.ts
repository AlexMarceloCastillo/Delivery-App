import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hide:boolean = true;
  // @ViewChild('input[type=password]') input: ElementRef;
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private authSvc: AuthService) {
    this.buildLoginForm();
  }

  private buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      pwd: ['',[Validators.required,Validators.minLength(6)]], //password
      remember: [true]
    });
  }

  ngOnInit(): void {
  }

  onSaveLogin(e: Event): void {
    e.preventDefault();
    if(this.loginForm.valid){
      const {email,pwd} = this.loginForm.value;
      this.authSvc.login(email,pwd)
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  public GoogleLogin(){
    this.authSvc.loginGoogle();
  }


  public toggleType(e: Event): void {
    e.preventDefault();
    this.hide = !this.hide;
  }

  // Solo para mostrar errores
  public get email(): any {
    return this.loginForm.get('email');
  }
  public get pwd(): any {
    return this.loginForm.get('pwd');
  }
}
