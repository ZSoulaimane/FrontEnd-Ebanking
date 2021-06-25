import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RdvRoutingModule } from './rdv-routing.module';
import { RdvComponent } from './component/rdv/rdv.component';
import { SharedModule } from '../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTimepickerModule } from 'mat-timepicker';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    RdvComponent,
  ],
  imports: [
    CommonModule,
    RdvRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    BrowserModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,

    MatDatepickerModule,
    MatInputModule,

    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  exports: [
    NgxMatTimepickerModule
  ],
  providers: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RdvModule { }
