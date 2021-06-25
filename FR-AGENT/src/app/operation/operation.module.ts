import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { OperationFormComponent } from './components/operation-form/operation-form.component';
import { OperationListComponent } from './components/operation-list/operation-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [OperationFormComponent, OperationListComponent],
  imports: [CommonModule, OperationRoutingModule, SharedModule],
})
export class OperationModule {}
