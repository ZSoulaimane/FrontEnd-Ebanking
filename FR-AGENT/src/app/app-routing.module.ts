import { OperatorOperationListComponent } from './operator/components/operator-operation-list/operator-operation-list.component';
import { OperatorItemComponent } from './operator/components/operator-item/operator-item.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './client/components/client-list/client-list.component';
import { LoginComponent } from './authentification/components/login/login.component';
import { ClientFormComponent } from './client/components/client-form/client-form.component';
import { AccountListComponent } from './account/components/account-list/account-list.component';
import { AccountFormComponent } from './account/components/account-form/account-form.component';
import { OperatorListComponent } from './operator/components/operator-list/operator-list.component';
import { OperatorFormComponent } from './operator/components/operator-form/operator-form.component';
import { OperationListComponent } from './operation/components/operation-list/operation-list.component';
import { OperationFormComponent } from './operation/components/operation-form/operation-form.component';
import { AuthGuardService } from './authentification/services/auth-guard.service';
import { RdvComponent } from './rdv/components/rdv/rdv.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full',
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'rdvs',
		component: RdvComponent,
		canActivate: [AuthGuardService],
	},
	{
		path: 'clients',
		component: ClientListComponent,
		canActivate: [AuthGuardService],
	},
	{
		path: 'client/new',
		component: ClientFormComponent,
		canActivate: [AuthGuardService],
	},
	{
		path: 'client/:idClient/accounts',
		component: AccountListComponent,
		canActivate: [AuthGuardService],
	},
	{
		path: 'client/:id/account/new',
		component: AccountFormComponent,
		canActivate: [AuthGuardService],
	},
	{
		path: 'operator/all',
		component: OperatorListComponent,
		canActivate: [AuthGuardService],
	},
	{
		path: 'operator/new',
		component: OperatorFormComponent,
		canActivate: [AuthGuardService],
	},
	{
		path: 'operator/:id',
		component: OperatorItemComponent,
		canActivate: [AuthGuardService],
	},
	{
		path: 'operator/:id/operation/all',
		component: OperatorOperationListComponent,
		canActivate: [AuthGuardService],
	},
	{
		path: 'client/:idClient/account/:idCompte/operation/all',
		component: OperationListComponent,
		canActivate: [AuthGuardService],
	},
	{
		path: 'client/:idClient/account/:idCompte/operation/new',
		component: OperationFormComponent,
		canActivate: [AuthGuardService],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
