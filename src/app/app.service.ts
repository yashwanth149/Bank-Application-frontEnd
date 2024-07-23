import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _isGuide = false;

  get isCheck(): boolean {
    return this._isGuide;
  }

  set isCheck(val: boolean) {
    this._isGuide = val;
  }
}