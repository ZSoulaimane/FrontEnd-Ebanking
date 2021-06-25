import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Currency } from "../model/currency.model";
import { CurrenciesService } from "../service/currencies.service";

@Component({
	selector: "app-currency-item",
	templateUrl: "./currency-item.component.html",
	styleUrls: ["./currency-item.component.css"],
})
export class CurrencyItemComponent implements OnInit {
	currId: string | any;
	currencyForm: FormGroup | any;
	currency: Currency | any;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private currencyService: CurrenciesService
	) {
		this.currency = new Currency();
		this.currId = this.route.snapshot.params["id"];
		console.log(this.currId);

		this.currencyService.findCurrency(this.currId).subscribe(
			(data) => {
				this.currency = data;
				console.log(this.currency);
				this.code.setValue(this.currency.code);
				this.nom.setValue(this.currency.nom);
			},
			(error) => console.log(error)
		);
	}
	ngOnInit(): void {
		this.currencyForm = new FormGroup({
			code: new FormControl("", Validators.required),
			nom: new FormControl("", Validators.required),
		});
	}

	get code() {
		return this.currencyForm.get("code");
	}

	get nom() {
		return this.currencyForm.get("nom");
	}

	onSubmit() {
		this.currency = this.currencyForm.value;
		this.currencyService
			.update(this.currId, this.currency)
			.subscribe((result) => this.gotoCurrencyList());
	}

	gotoCurrencyList() {
		this.router.navigate(["/overview/currency/all"]);
	}
}
