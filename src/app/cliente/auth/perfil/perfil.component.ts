import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { Cliente } from '@core/modelos/cliente.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  cliente: Cliente = {
    uid: '',
    email: '',
    photoURL: '',
    domicilio: {
      num: 0,
      dir: ''
    }
  }

  public isGoogle: boolean = false;
  //Imagen Perfil
  private file;
  public urlImage: Observable<string>;
  public uploadPercent: Observable<number>;
  //Formulario Update Datos
  public updateForm: FormGroup;

  //Formulario Update Password
  public passwordForm: FormGroup;

  constructor(private authSvc: AuthService,private storage: AngularFireStorage) {
    this.buildUpdateForm();
    this.buildPasswordForm();
    this.authSvc.getDataClient().subscribe((user)=>{
      if(user){
        this.cliente.uid = user.uid;
        this.cliente.nombre = user.nombre;
        this.cliente.email = user.email;
        this.cliente.photoURL = user.photoURL;
        if(user.domicilio != null){
          this.cliente.domicilio = user.domicilio
        }else{
          this.cliente.domicilio.dir = ''
          this.cliente.domicilio.num = 0
        }
        this.updateForm.setValue({
          email: this.cliente.email,
          nombre: this.cliente.nombre,
          numero: this.cliente.domicilio.num,
          direccion: this.cliente.domicilio.dir
        })
      }
    })
    //Si esta logueado por google no necesita contraseña
    this.authSvc.isAuth().subscribe((user)=>{
      if(user){
        if(user.providerData[0].providerId == 'google.com'){
          this.isGoogle = true;
        }
      }
    })
  }

  //Formulario Update Profile
  private buildUpdateForm() {
    const emailPattern =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.updateForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.pattern(emailPattern)]),
      nombre: new FormControl('',[Validators.required,Validators.maxLength(18)]),
      numero: new FormControl(0,[Validators.required,Validators.min(1),Validators.max(9999)]),
      direccion: new FormControl('',[Validators.required,Validators.maxLength(75)])
    })
  }
  get email(){return this.updateForm.get('email');}
  get nombre(){return this.updateForm.get('nombre');}
  get numero(){return this.updateForm.get('numero');}
  get direccion(){return this.updateForm.get('direccion');}

  //Formulario Update Password
  private buildPasswordForm(){
    this.passwordForm = new FormGroup({
      pwd: new FormControl('',[Validators.required,Validators.minLength(6)]),
      repwd: new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }
  get pwd(){return this.passwordForm.get('pwd');}
  get repwd(){return this.passwordForm.get('repwd');}

  //Metodo Update
  public onUpdateProfile(){
    const {email,nombre,numero,direccion} = this.updateForm.value
    this.authSvc.isAuth().subscribe((user)=>{
      user.updateEmail(email)
      .then(()=>{
        this.cliente.nombre = nombre;
        this.cliente.email = email
        this.cliente.domicilio.dir = direccion;
        this.cliente.domicilio.num = numero;
        if(this.file != null){
          this.onUpload()
        }
        this.authSvc.updateProfile(this.cliente)
      })
      .catch((err) => {
        this.updateForm.setValue({email: this.cliente.email, nombre: this.cliente.nombre,
          numero: this.cliente.domicilio.num,
          direccion: this.cliente.domicilio.dir});
          this.authSvc.getError(err.code,'Error al Actualizar')
        })
      })
    }
    //Cargar imagen
    onFile(e: {target: {files: any[];};}){
      this.file = e.target.files[0]
    }
    //Subir Imagen
    async onUpload(){
      const file = this.file;
      const filePath = `uploads/clients/profile_${this.cliente.uid}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath,file);
      this.uploadPercent = task.percentageChanges()
      task.snapshotChanges().pipe(finalize(()=>this.urlImage = ref.getDownloadURL())).subscribe();
      await task.then(()=>{
        this.urlImage.subscribe((url)=>{
          this.cliente.photoURL = url
          this.authSvc.toastrSvc.success('Imagen Cargada con Exito','',{
            positionClass: 'toast-center-center',
            timeOut: 800
          })
        })
      })
    }

    //Cambiar Contraseña
    onUpdatePassword(){
      const {pwd,repwd} = this.passwordForm.value;
      if(pwd != repwd){
        this.authSvc.toastrSvc.error('','Las contraseñas no coinciden',{
          positionClass: 'toast-center-center',
          timeOut: 800
        })
        this.passwordForm.reset()
      }else{
        this.authSvc.isAuth().subscribe((user)=>{
          user.updatePassword(repwd)
          .then(()=>{
            this.authSvc.toastrSvc.success('','Contraseña Actualizada',{
              positionClass: 'toast-center-center',
              timeOut: 800
            })
            this.passwordForm.reset()
          })
          .catch((err)=>{
            this.authSvc.getError(err.code,'Error al Actualizar la Contraseña')
          })
        })
      }
    }

    ngOnInit(): void {
    }

  }
