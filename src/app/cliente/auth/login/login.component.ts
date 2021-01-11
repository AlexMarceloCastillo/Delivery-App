import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildLoginForm();
  }

  private buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      pwd: ['',[Validators.required]], //password
      remember: [true]
    });
  }

  ngOnInit(): void {
  }

  onSaveLogin(e: Event): void {
    e.preventDefault();
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
    // this.onResetForm();
  }

  private onResetForm(): void{
    this.loginForm.reset();
  }

  // Solo para mostrar errores
  public get email(): any {
    return this.loginForm.get('email');
  }
  public get pwd(): any {
    return this.loginForm.get('pwd');
  }
}
