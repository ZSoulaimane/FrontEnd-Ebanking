import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientItemComponent } from './components/client-item/client-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ClientListComponent, ClientFormComponent, ClientItemComponent],
  imports: [CommonModule, ClientRoutingModule, SharedModule],
})
export class ClientModule {}
