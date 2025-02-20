import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BankListComponent } from './bank-list/bank-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonComponent } from './person/person.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SharedModule } from './common/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { GuidedTourModule, GuidedTourService } from 'ngx-guided-tour';
import { CitymasterComponent } from './citymaster/citymaster.component';
import { CitySearchComponent } from './city-search/city-search.component';
import { IdleService } from './idle.service';
import { AppComponent } from './app.component';
import { CdkVirtualScrollComponent } from './cdk-virtual-scroll/cdk-virtual-scroll.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { MnbarComponent } from './mnbar/mnbar.component';
import { RDComponent } from './r-d/r-d.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './store/total-balance-store/total-balance.reducers';
import { EffectsModule } from '@ngrx/effects';
import { TotalBalanceEffects } from './store/total-balance-store/total-balance.effects';




@NgModule({
  declarations: [
    AppComponent,
    BankListComponent,
    PersonComponent,
    LoginPageComponent,
    DashboardComponent,
    CitymasterComponent,
    CitySearchComponent,
    CdkVirtualScrollComponent,
    MnbarComponent,
    RDComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    GuidedTourModule,
    PDFExportModule,
    ScrollingModule,
    StoreModule.forRoot({'balance': reducers}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([TotalBalanceEffects]),
  ],

  providers: [
    GuidedTourService,
    IdleService,
  ],
  bootstrap: [AppComponent],
  exports: [GuidedTourModule]
})
export class AppModule {
}
