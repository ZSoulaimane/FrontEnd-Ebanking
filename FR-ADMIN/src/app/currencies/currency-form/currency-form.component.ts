import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Currency } from "../model/currency.model";
import { CurrenciesService } from "../service/currencies.service";

@Component({
	selector: "app-currency-form",
	templateUrl: "./currency-form.component.html",
	styleUrls: ["./currency-form.component.css"],
})
export class CurrencyFormComponent implements OnInit {
	currencyForm: FormGroup | any;
	currency: Currency | any;

	constructor(
		private router: Router,
		private currencyService: CurrenciesService
	) {
		this.currency = new Currency();
	}
	ngOnInit(): void {
		this.currencyForm = new FormGroup({
			code: new FormControl("", Validators.required),
			nom: new FormControl("", Validators.required),
		});
	}

	get code() {
		return this.currencyForm.get("code").value;
	}

	get nom() {
		return this.currencyForm.get("nom").value;
	}

	onSubmit() {
		this.currency.code = this.code.trim().toUpperCase();
		this.currency.nom = this.nom;
		this.currencyService
			.save(this.currency)
			.subscribe((result) => this.gotoCurrencyList());
	}

	gotoCurrencyList() {
		this.router.navigate(["/overview/currency/all"]);
	}
}
