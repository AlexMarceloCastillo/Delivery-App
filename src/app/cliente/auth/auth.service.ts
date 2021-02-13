import { Injectable } from '@angular/core';
//Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import firebase from 'firebase/app';
//Modelo
import { Cliente } from 'src/app/modelos/cliente';
//Router
import { Router } from '@angular/router';
//Rxjs
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
//Toast
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afsAuth: AngularFireAuth,private afs: AngularFirestore,public router: Router,public toastrSvc: ToastrService) { }

  //Login
  async login(email: string, pwd: string): Promise<Cliente>{
    try{
      const {user} = await this.afsAuth.signInWithEmailAndPassword(email,pwd);
      this.toastrSvc.success('Logueado Correctamente','',{
        positionClass: 'toast-center-center',
        timeOut: 800
      })
      setTimeout(()=>{
        this.redirect()
      },1000)
      return user;
    }catch(error){
      this.getError(error.code,'Error al loguearse')
    }
  }

  //GoogleLogin
  async loginGoogle(): Promise<Cliente>{
    try{
      const {user} = await this.afsAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.updateClienteData(user,user.displayName)
      this.toastrSvc.success('Logueado Correctamente','',{
        positionClass: 'toast-center-center',
        timeOut: 800
      })
      setTimeout(()=>{
        this.redirect()
      },1000)
      return user;
    }catch(error){
      this.getError(error.code,'Error al loguearse con Google')
    }
  }

  //Register
  async register(email: string, pwd: string,username: string): Promise<Cliente>{
    try{
      const {user} = await this.afsAuth.createUserWithEmailAndPassword(email,pwd);
      this.updateClienteData(user,username);
      this.toastrSvc.success('Registrado Correctamente','',{
        positionClass: 'toast-center-center',
        timeOut: 800
      })
      setTimeout(()=>{
        this.redirect()
      },1000)
      return user;
    }
    catch(error){
      this.getError(error.code,'Error al registrarse')
    }
  }

  //LogOut
  logOut(){
    this.afsAuth.signOut();
    this.redirect();
  }

  //Obtener estado de login
  isAuth(){
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
  //Obtener datos de usuario
  getDataClient(){
    return this.afsAuth.authState.pipe(
      switchMap((data)=>{
        if(data){
          return this.afs.doc<Cliente>(`/clients/${data.uid}`).valueChanges();
        }
        //Si no existe es nulo
        return of(null)
      })
    )
  }

  //Redireccionar
  public redirect(){
    this.router.navigate(['/home']);
  }
  //Guardar el cliente en una coleccion de Firestore
  private updateClienteData(cliente: any,username: string){
    //Referencia de usuario a guardar
    const userRef: AngularFirestoreDocument<Cliente> = this.afs.doc(`clients/${cliente.uid}`);
    const data: Cliente = {
      uid: cliente.uid,
      email: cliente.email,
      nombre: username,
      role: 0,
      photoURL: cliente.photoURL
    }
    return userRef.set(data, {merge: true});
  }

  //Errores de firebase
  public getError(ind: string,titulo: string){
    const code=['auth/user-not-found',
    'auth/invalid-email',
    'auth/wrong-password',
    'auth/email-already-in-use',
    'auth/too-many-requests'];
    const message=['Usuario no encontrado',
    'Email invalido',
    'La contraseña es incorrecta',
    'El email ya esta en uso',
    'El acceso a esta cuenta ha sido temporalmente deshabilitado'];
    const index = code.indexOf(ind);
    const mss = message[index];
    this.toastrSvc.error(mss,titulo,{
      positionClass: 'toast-center-center',
    })
  }



}
