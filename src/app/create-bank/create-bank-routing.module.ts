import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBankComponent } from './create-bank.component';

const routes: Routes = [
  {
    path:'',
    component: CreateBankComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateBankRoutingModule { }
