

import { Injectable, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, interval, Observable, Subject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IdleService implements OnDestroy {
  public idlSub = new Subject<boolean>();
  private timeOut = 2;
  private idleTimeInterval = 3;
  private idleSubscription: Subscription;
  private lastActivity: Date;
  private isWatching = false;
  route = inject(Router);
  public isCheckGuide = new BehaviorSubject<boolean>(false);

  isLoggedIn = new BehaviorSubject<boolean>(false);

  get idleState(): Observable<boolean> {
    return this.idlSub.asObservable();
  }

  get isGuideCheck(): Observable<boolean>{
    return this.isCheckGuide.asObservable();
  }

  startWatching() {
    if (!this.isWatching) {
      this.lastActivity = new Date();
      this.idlSub = new Subject<boolean>();
      this.idleSubscription = interval(this.idleTimeInterval * 1000).subscribe(() => {
        const dt = new Date();
        if (dt.getTime() - this.lastActivity.getTime() > this.timeOut * 1000) {
          this.idlSub.next(true);
        }
      });

      fromEvent(window, 'mousemove').subscribe(() => this.resetTimer());
      fromEvent(window, 'mousedown').subscribe(() => this.resetTimer());
      fromEvent(window, 'keypress').subscribe(() => this.resetTimer());
      fromEvent(window, 'touchstart').subscribe(() => this.resetTimer());
      fromEvent(window, 'scroll').subscribe(() => this.resetTimer());

      this.isWatching = true;
    }
  }

  stopWatching() {
    if (this.isWatching) {
      if (this.idleSubscription) {
        this.idleSubscription.unsubscribe();
        this.idlSub.complete();
      }
      this.isLoggedIn.next(false);
      this.isWatching = false;
    }
  }

  resetTimer() {
    this.lastActivity = new Date();
    this.idlSub.next(false);
  }

  ngOnDestroy(): void {
    this.stopWatching();
  }
}







