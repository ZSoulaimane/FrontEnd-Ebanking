import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Agence } from "../model/agence.model";
import { AgenceService } from "../services/agence.service";

@Component({
	selector: "app-agence-item",
	templateUrl: "./agence-item.component.html",
	styleUrls: ["./agence-item.component.css"],
})
export class AgenceItemComponent implements OnInit {
	agence: Agence | any;
	agenceForm: FormGroup | any;
	id: number | any;

	get nom() {
		return this.agenceForm.get("nom");
	}

	get adresse() {
		return this.agenceForm.get("adresse");
	}

	get telephone() {
		return this.agenceForm.get("telephone");
	}

	get email() {
		return this.agenceForm.get("email");
	}

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private agenceService: AgenceService
	) {}

	ngOnInit(): void {
		const regexPhone = /^0[6|7|5]\d{8}$/;

		this.agenceForm = new FormGroup({
			nom: new FormControl("", Validators.required),
			adresse: new FormControl("", Validators.required),
			telephone: new FormControl("", [
				Validators.required,
				Validators.pattern(regexPhone),
			]),
			email: new FormControl("", [Validators.email, Validators.required]),
		});

		this.id = this.route.snapshot.params["id"];
		this.agenceService.getAgence(this.id).subscribe(
			(data) => {
				this.agence = data[0];
				this.adresse.setValue(this.agence.adresse);
				this.nom.setValue(this.agence.nom);
				this.telephone.setValue(this.agence.telephone);
				this.email.setValue(this.agence.email);
			},
			(error) => console.log(error)
		);
	}

	onSubmit() {
		this.agence = this.agenceForm.value;
		this.agenceService
			.update(this.id, this.agence)
			.subscribe((result) => this.gotoAgenceList());
	}

	gotoAgenceList() {
		this.router.navigate(["/overview/agence/all"]);
	}
}
