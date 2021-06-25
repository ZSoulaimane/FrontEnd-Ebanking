import { SharedModule } from "./shared/shared.module";
import { AdminModule } from "./admin/admin.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { LoginService } from "./auth/services/login.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AgenceModule } from "./agence/agence.module";
import { AuthModule } from "./auth/auth.module";
import { AgentModule } from "./agent/agent.module";
import { CurrenciesModule } from "./currencies/currencies.module";
import { AuthInterceptorService } from "./auth/services/auth-interceptor.service";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AuthModule,
		AgenceModule,
		AdminModule,
		AgentModule,
		CurrenciesModule,
		SharedModule,
	],
	providers: [
		LoginService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
