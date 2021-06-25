import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperatorRoutingModule } from './operator-routing.module';
import { OperatorListComponent } from './components/operator-list/operator-list.component';
import { OperatorFormComponent } from './components/operator-form/operator-form.component';
import { OperatorItemComponent } from './components/operator-item/operator-item.component';
import { SharedModule } from '../shared/shared.module';
import { OperatorOperationListComponent } from './components/operator-operation-list/operator-operation-list.component';

@NgModule({
	declarations: [
		OperatorListComponent,
		OperatorFormComponent,
		OperatorItemComponent,
		OperatorOperationListComponent,
	],
	imports: [CommonModule, OperatorRoutingModule, SharedModule],
})
export class OperatorModule {}
