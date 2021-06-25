import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OperatorModule } from './operator/operator.module';
import { OperationModule } from './operation/operation.module';
import { ClientModule } from './client/client.module';
import { AccountModule } from './account/account.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthHtppInterceptorService } from './authentification/services/basic-auth-http-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import {RdvModule} from './rdv/rdv.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OperatorModule,
    OperationModule,
    ClientModule,
    AccountModule,
    AuthentificationModule,
    SharedModule,
    RdvModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHtppInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent],
})
export class AppModule {}
