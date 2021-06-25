import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/account/service/account.service';
import { OperationService } from '../../service/operation.service';
import { CurrencyConversionService } from 'src/app/shared/services/currency-conversion.service';
import { Currency } from 'src/app/shared/models/currency';
import { Operation } from '../../model/operation';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Account } from 'src/app/account/model/account';

@Component({
	selector: 'app-operation-form',
	templateUrl: './operation-form.component.html',
	styleUrls: ['./operation-form.component.css'],
})
export class OperationFormComponent implements OnInit {
	idCompte: string;
	idClient: string;
	operation: Operation;
	account: Account;
	accounts: Account[];
	currencies: Currency[];
	currency: Currency;
	rate: number;
	midpoint: number;
	devise1: string;
	devise2: string;

	operationForm = new FormGroup({
		type: new FormControl('', Validators.required),
		sommeEspece: new FormControl('', Validators.required),
		devise: new FormControl('', Validators.required),
	});

	get type() {
		return this.operationForm.get('type');
	}

	get sommeEspece() {
		return this.operationForm.get('sommeEspece');
	}
	get devise() {
		return this.operationForm.get('devise');
	}

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private accountService: AccountService,
		private operationService: OperationService,
		private currencyService: CurrencyConversionService
	) {
		console.log('operationForm');
		this.idCompte = this.route.snapshot.params['idCompte'];
		this.idClient = this.route.snapshot.params['idClient'];
		console.log(this.idCompte, this.idClient);
	}

	ngOnInit(): void {
		this.accountService.findAccount(this.idCompte).subscribe(
			(data) => {
				console.log(data);
				this.account = data[0];
			},
			(error) => {
				console.log(error);
			}
		);
		this.currencyService.findAllCurrencies().subscribe(
			(data) => {
				console.log(data);
				this.currencies = data;
			},
			(error) => {
				console.log(error);
			}
		);
	}

	onSubmit() {
		this.operation = this.operationForm.value;
		this.operation.sommeEspece = parseInt(this.sommeEspece.value);
		this.operation.compte = this.account;
		this.devise1 = this.account.devise.code;
		this.devise2 = this.operation.devise.code;
		setTimeout(() => {
			this.currencyService.getRate(this.devise2, this.devise1).subscribe(
				(data) => {
					console.log(data);
					//get the rate
					this.rate = data;
					// 3mr operation
					this.operation.sommeCompte =
						this.operation.sommeEspece * this.rate;
					console.log(this.operation);
					this.operationService
						.save(this.operation)
						.subscribe((result) => this.gotoOperationList());
				},
				(error) => console.log(error)
			);
		}, 1000);
	}

	gotoOperationList() {
		this.router.navigate([
			'/client/' +
				this.idClient +
				'/account/' +
				this.idCompte +
				'/operation/all',
		]);
	}

	reset() {
		this.operationForm.reset();
	}
}
