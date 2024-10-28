import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading!: boolean;
  private _loadingState:BehaviorSubject<boolean | undefined> = new BehaviorSubject<boolean | undefined>(undefined);
  loadingState: Observable<boolean | undefined> = this._loadingState.asObservable();

  constructor() { }

  startLoading(){
    if(!this.isLoading){
      this._loadingState.next(true);
      this.isLoading = true;
    }
  }

  stopLoading(){
    if(this.isLoading){ 
      this._loadingState.next(false);
      this.isLoading = false;
    }
  }

  isCurrentlyLoading():boolean | undefined{
    return this._loadingState.getValue();
  }
}
