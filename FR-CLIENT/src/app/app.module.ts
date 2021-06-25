import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';
import { TransferModule } from './transfer/transfer.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { BasicAuthHtppInterceptorService } from './authentification/services/basic-auth-http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { RechargeModule } from './recharge/recharge.module';
import { RdvModule } from './rdv/rdv.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VirementmultipleComponent } from './transferMultiple/components/virementmultiple/virementmultiple.component';
import { AjouterBeneficiaireComponent } from './transferMultiple/components/ajouter-beneficiaire/ajouter-beneficiaire.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
//import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from 'ngx-mat-datetime-picker';
@NgModule({
  declarations: [
    AppComponent,
    VirementmultipleComponent,
    AjouterBeneficiaireComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccountModule,
    TransferModule,
    AuthentificationModule,
    RechargeModule,
    RdvModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
    MatDatepickerModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    //NgxMatTimepickerModule,
    //NgxMatDatetimePickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHtppInterceptorService,
      multi: true,
    },
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ConfirmationDialogComponent],
})
export class AppModule {}
