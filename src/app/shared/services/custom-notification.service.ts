import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomNotificationService {

  public _loading: boolean = false;

  constructor() { }

  get loading(): boolean {
    return this._loading;
  }

  onRequestedStarted(): void {
    this._loading = true;
  }

  onRequestFinished(): void {
    this._loading = false;
  }

  // calculateTime(previous, nedate) {
  //   let current: any = new Date(nedate)

  //   var msPerMinute = 60 * 1000;
  //   var msPerHour = msPerMinute * 60;
  //   var msPerDay = msPerHour * 24;
  //   var msPerMonth = msPerDay * 30;
  //   var msPerYear = msPerDay * 365;


  //   var elapsed = current - previous;
  //   return Math.round(elapsed / msPerDay)
  // };
}
