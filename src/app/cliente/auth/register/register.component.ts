import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/cliente/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public hide: boolean = true;

  public registerForm: FormGroup;


  constructor(private formBuilder: FormBuilder,private authSvc: AuthService) {
    this.buildRegisterForm();
  }


  ngOnInit(): void {
  }


  private buildRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.maxLength(12)]],
      email: ['',[Validators.required, Validators.email]],
      pwd: ['',[Validators.required,Validators.minLength(6)]] //password
    });
  }

  public onSaveRegister(e: Event): void {
    e.preventDefault();
    if(this.registerForm.valid){
      const {email,pwd,username} = this.registerForm.value;
      this.authSvc.register(email,pwd,username);
      this.registerForm.reset();
    } else {
      this.registerForm.markAllAsTouched();
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
    return this.registerForm.get('email');
  }
  public get pwd(): any {
    return this.registerForm.get('pwd');
  }
  public get name(): any {
    return this.registerForm.get('username');
  }
}
