import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AccountSummaryComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}
