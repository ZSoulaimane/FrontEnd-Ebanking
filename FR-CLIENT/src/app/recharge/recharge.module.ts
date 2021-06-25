import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RechargeRoutingModule } from './recharge-routing.module';
import { RechargeFormComponent } from './components/recharge-form/recharge-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RechargeFormComponent],
  imports: [CommonModule, RechargeRoutingModule, SharedModule],
})
export class RechargeModule {}
