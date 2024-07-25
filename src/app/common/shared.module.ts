import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MnbarComponent } from './mnbar/mnbar.component';
import { GuidedTourModule, GuidedTourService } from 'ngx-guided-tour';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    NavBarComponent,
    MnbarComponent,
    
  ],
  imports: [ 
    MaterialModule,
    ReactiveFormsModule,
    GuidedTourModule,
    CommonModule,
    ScrollingModule,
  ],
  exports:[NavBarComponent,MaterialModule, ReactiveFormsModule,MnbarComponent,ScrollingModule],
  providers: [GuidedTourService],

})
export class SharedModule { }
