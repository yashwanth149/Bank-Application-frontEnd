import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { GuidedTourService, Orientation } from 'ngx-guided-tour';
import { IdleService } from 'src/app/idle.service';
import { AppStateInterface } from '../app-state.interface';
import { userNameSelecotor } from '../store/credintials-store/credintials.selectors';
import * as CredintialsActions from "../store/credintials-store/credintials.actions";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mnbar',
  templateUrl: './mnbar.component.html',
  styleUrls: ['./mnbar.component.scss']
})
export class MnbarComponent implements OnInit {
  components: any[] = [
    { name: 'Bank Master', path: 'list' },
    { name: 'Dashboard', path: 'dash' },
    { name: 'Create Master', path: 'create' },
    { name: 'City Master', path: 'city-search' },
  ];
  filteredComponents: any[] = [];
  isGuide: any;
  userName: string

  constructor(
    private route: Router,
    private guideServ: GuidedTourService,
    private idlServ: IdleService,
    private store: Store<AppStateInterface>
  ) { }

  ngOnInit(): void {
    this.store.select(userNameSelecotor).subscribe(data => {
      console.log('user',data);
      
      this.userName = data;
    })
  }
  navigateToComponent(evnt: string) {
    const searchComp = evnt.trim().toLowerCase();
    this.filteredComponents = this.components.filter(component =>
      component.name.toLowerCase().includes(searchComp)
    );
  }
  navigateTo(component: any) {
    this.route.navigate(['/' + component.path], { queryParams: { mode: this.isGuide } });
    this.filteredComponents = [];
  }
  tour() {
    this.idlServ.isCheckGuide.next(true);
    this.guideServ.startTour({
      tourId: 'tour',
      useOrb: false,
      steps: [
        {
          title: 'Components',
          selector: '.t1',
          content: 'Search bar for the components...',
          orientation: Orientation.Bottom
        }
      ]
    });

  }

  logout() {
    this.store.dispatch(CredintialsActions.userLogout({ isSuccess: false }));
  }
}
