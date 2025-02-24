import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBankComponent } from './create-bank/create-bank.component';
import { BankListComponent } from './bank-list/bank-list.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CitymasterComponent } from './citymaster/citymaster.component';
import { CitySearchComponent } from './city-search/city-search.component';
import { CdkVirtualScrollComponent } from './cdk-virtual-scroll/cdk-virtual-scroll.component';
import { RDComponent } from './r-d/r-d.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'create', loadChildren: () => import('./create-bank/create-bank.module').then(module => module.CreateBankModule), canActivate: [AuthGuard] },
  { path: 'list', component: BankListComponent,canActivate: [AuthGuard]},
  { path: 'update/:id', component: CreateBankComponent, canActivate: [AuthGuard] },
  { path: 'dash', component: DashboardComponent,
     canActivate: [AuthGuard] 
    },
  { path: 'city', component: CitymasterComponent, canActivate: [AuthGuard] },
  { path: 'city-search', component: CitySearchComponent, canActivate: [AuthGuard] },
  { path: 'city-search/:id', component: CitymasterComponent, canActivate: [AuthGuard] },
  { path: 'R&D', component: CdkVirtualScrollComponent, canActivate: [AuthGuard] },
  { path: 'reserch', component: RDComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
