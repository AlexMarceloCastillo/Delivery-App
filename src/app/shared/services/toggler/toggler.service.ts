import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TogglerService {

  public statusSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public status$ = this.statusSubject.asObservable();

  constructor() { }

  public toggle(value:boolean): void{
    this.statusSubject.next(value);
  }
}
