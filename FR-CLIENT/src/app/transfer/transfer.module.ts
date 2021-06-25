import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { TransferFormComponent } from './components/transfer-form/transfer-form.component';
import { SharedModule } from '../shared/shared.module';
import { TransferListComponent } from './components/transfer-list/transfer-list.component';
import { TransferDoneComponent } from './components/transfer-done/transfer-done.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    TransferFormComponent,
    TransferListComponent,
    TransferDoneComponent,
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    SharedModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TransferModule {}
