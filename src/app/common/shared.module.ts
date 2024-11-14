import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuidedTourModule, GuidedTourService } from 'ngx-guided-tour';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatAutocompleteModule} from '@angular/material/autocomplete';




@NgModule({
  declarations: [
    NavBarComponent,
    
  ],
  imports: [ 
    MaterialModule,
    ReactiveFormsModule,
    GuidedTourModule,
    CommonModule,
    ScrollingModule,
    AutoCompleteModule,
    FormsModule,
    MatAutocompleteModule
  ],
  exports:[NavBarComponent,
    MaterialModule,
     ReactiveFormsModule,
     ScrollingModule,
     AutoCompleteModule,
     FormsModule,
     MatAutocompleteModule
    ],
  providers: [GuidedTourService],

})
export class SharedModule { }
