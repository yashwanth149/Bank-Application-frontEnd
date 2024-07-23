import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBankRoutingModule } from './create-bank-routing.module';
import { CreateBankComponent } from './create-bank.component';
import { DisplayComponent } from './display/display.component';
import { SharedModule } from '../common/shared.module';

@NgModule({
  declarations: [
    CreateBankComponent,
    DisplayComponent,

  ],
  imports: [
    CommonModule,
    CreateBankRoutingModule,
    SharedModule,
    
  ]
})
export class CreateBankModule { }
