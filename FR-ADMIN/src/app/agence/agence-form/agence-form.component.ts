import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { AgenceService } from "./../services/agence.service";
import { Agence } from "../model/agence.model";
import { Router } from "@angular/router";

@Component({
	selector: "app-agence-form",
	templateUrl: "./agence-form.component.html",
	styleUrls: ["./agence-form.component.css"],
})
export class AgenceFormComponent implements OnInit {
	title: string = "Formulaire création agence";
	form: FormGroup | any;

	agence: Agence = new Agence();

	get nom() {
		return this.form.get("nom");
	}
	get telephone() {
		return this.form.get("telephone");
	}
	get adresse() {
		return this.form.get("adresse");
	}
	get email() {
		return this.form.get("email");
	}

	constructor(
		private fb: FormBuilder,
		private agenceService: AgenceService,
		private router: Router
	) {}

	ngOnInit(): void {
		const regexPhone = /^0[6|7|5]\d{8}$/;

		this.form = this.fb.group({
			nom: new FormControl("", Validators.required),
			telephone: new FormControl("", [
				Validators.required,
				Validators.pattern(regexPhone),
			]),
			adresse: new FormControl("", Validators.required),
			email: new FormControl("", [Validators.required, Validators.email]),
		});
	}

	onSubmit() {
		this.agence = this.form.value;
		console.warn(JSON.stringify(this.agence));
		this.agenceService.save(this.agence).subscribe((result) => {
			this.goToAgencies();
		});
	}

	goToAgencies() {
		this.router.navigate(["/overview/agence/all"]);
	}
}
