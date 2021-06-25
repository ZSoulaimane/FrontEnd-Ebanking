import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RdvComponent } from './components/rdv/rdv.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [RdvComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RdvModule { }
