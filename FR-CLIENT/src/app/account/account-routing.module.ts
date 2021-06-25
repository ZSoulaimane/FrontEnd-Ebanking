import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
