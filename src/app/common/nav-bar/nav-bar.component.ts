import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IdleService } from 'src/app/idle.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit,OnDestroy {
  buttonLabels: string[] = [];

  constructor(private route: Router) { }
  @ViewChild('sidenav') sidenav: ElementRef;

  // idleServ = inject(IdleService);
  // private idleSubscription : Subscription

  ngOnInit(): void {
    // this.idleServ.idleSate.subscribe((isIdle) => {
    //   if (isIdle) {
    //     console.log('Inactive');
    //     setTimeout(()=>{
    //       this.logout();
    //     },1000);
    //   } 
    //   else {
    //     console.log('Active')
    //   }
    // })
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/login'])
  }

  toCreate() {
    this.route.navigate(['/dash'])
  }


  tolist() {
    this.route.navigate(['/list'])

  }

  toCity() {
    this.route.navigate(['city-search'])
  }

  onAction(){
    // this.idleServ.resetTImer();
  }

  ngOnDestroy(){
    // if(this.idleSubscription){
    //   this.idleSubscription.unsubscribe();
    // }
  }

}
