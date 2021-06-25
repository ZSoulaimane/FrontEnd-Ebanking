import { LoginFormComponent } from "./login-form/login-form.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	declarations: [LoginFormComponent],
	imports: [CommonModule, SharedModule],
})
export class AuthModule {}
