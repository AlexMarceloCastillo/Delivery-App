import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TogglerService {

  private statusSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public status$ = this.statusSubject.asObservable();

  constructor() { }

  public toggle(aux:boolean): void{
    this.statusSubject.next(aux);
  }
}
