import { LoginFormComponent } from "./auth/login-form/login-form.component";
import { AgenceListComponent } from "./agence/agence-list/agence-list.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AgenceFormComponent } from "./agence/agence-form/agence-form.component";
import { AgentFormComponent } from "./agent/agent-form/agent-form.component";
import { AgentListComponent } from "./agent/agent-list/agent-list.component";
import { LoginActivateGuard } from "./guards/login-activate.guard";
import { AdminListComponent } from "./admin/admin-list/admin-list.component";
import { NavigationComponent } from "./shared/navigation/navigation.component";
import { AgenceItemComponent } from "./agence/agence-item/agence-item.component";
import { AgentItemComponent } from "./agent/agent-item/agent-item.component";
import { AdminFormComponent } from "./admin/admin-form/admin-form.component";
import { CurrencyListComponent } from "./currencies/currency-list/currency-list.component";
import { CurrencyFormComponent } from "./currencies/currency-form/currency-form.component";
import { CurrencyItemComponent } from "./currencies/currency-item/currency-item.component";

const routes: Routes = [
	{
		path: "",
		redirectTo: "overview/agence/all",
		pathMatch: "full",
	},
	{
		path: "login",
		component: LoginFormComponent,
	},
	{
		path: "overview",
		children: [
			/*
			 * *******************
			 * Admin
			 * *******************
			 */
			{
				path: "admin/all",
				component: AdminListComponent,
				canActivate: [LoginActivateGuard],
			},
			{
				path: "admin/new",
				component: AdminFormComponent,
				canActivate: [LoginActivateGuard],
			},

			/*
			 * *******************
			 * Devise
			 * *******************
			 */
			{
				path: "currency/all",
				component: CurrencyListComponent,
				canActivate: [LoginActivateGuard],
			},
			{
				path: "currency/new",
				component: CurrencyFormComponent,
				canActivate: [LoginActivateGuard],
			},
			{
				path: "currency/:id",
				component: CurrencyItemComponent,
				canActivate: [LoginActivateGuard],
			},

			/*
			 * *******************
			 * Agence
			 * *******************
			 */
			{
				path: "agence/all",
				component: AgenceListComponent,
				canActivate: [LoginActivateGuard],
			},
			{
				path: "agence/new",
				component: AgenceFormComponent,
				canActivate: [LoginActivateGuard],
			},
			{
				path: "agence/:id",
				component: AgenceItemComponent,
			},

			/*
			 * *******************
			 * Agent
			 * *******************
			 */
			{
				path: "agence/:id/agent/all",
				component: AgentListComponent,
				canActivate: [LoginActivateGuard],
			},
			{
				path: "agence/:id/agent/new",
				component: AgentFormComponent,
				canActivate: [LoginActivateGuard],
			},
			{
				path: "agence/:id/agent/:id2",
				component: AgentItemComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
