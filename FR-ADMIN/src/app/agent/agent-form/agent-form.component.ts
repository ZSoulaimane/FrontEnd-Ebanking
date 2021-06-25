import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Agence } from "src/app/agence/model/agence.model";
import { AgenceService } from "src/app/agence/services/agence.service";
import { Agent } from "../model/agent.model";
import { AgentService } from "../service/agent.service";

@Component({
	selector: "app-agent-form",
	templateUrl: "./agent-form.component.html",
	styleUrls: ["./agent-form.component.css"],
})
export class AgentFormComponent implements OnInit {
	agent: Agent | any;
	agence: Agence | any;
	idAgence: number | any;
	agentForm: FormGroup | any;
	error = "";

	get prenom() {
		return this.agentForm.get("prenom");
	}

	get nom() {
		return this.agentForm.get("nom");
	}

	get cin() {
		return this.agentForm.get("cin");
	}

	get adresse() {
		return this.agentForm.get("adresse");
	}

	get telephone() {
		return this.agentForm.get("telephone");
	}

	get username() {
		return this.agentForm.get("username");
	}

	get email() {
		return this.agentForm.get("email");
	}
	get password() {
		return this.agentForm.get("password");
	}

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private agentService: AgentService,
		private agenceService: AgenceService
	) {
		const regexPhone = /^0[6|7|5]\d{8}$/;
		const regexCIN = /^\w{1,2}\d{1,6}$/;
		this.agentForm = new FormGroup({
			nom: new FormControl("", Validators.required),
			prenom: new FormControl("", Validators.required),
			cin: new FormControl("", [
				Validators.required,
				Validators.pattern(regexCIN),
			]),
			adresse: new FormControl("", Validators.required),
			telephone: new FormControl("", [
				Validators.required,
				Validators.pattern(regexPhone),
			]),
			username: new FormControl("", Validators.required),
			password: new FormControl("", Validators.required),
			email: new FormControl("", [Validators.email, Validators.required]),
		});
	}

	ngOnInit(): void {
		this.idAgence = this.route.snapshot.params["id"];
		this.agenceService.getAgence(this.idAgence).subscribe((data) => {
			this.agence = data[0];
		});
	}

	onSubmit() {
		this.agent = this.agentForm.value;
		this.agent.agence = this.agence;
		console.log(this.agent);
		this.agentService.save(this.agent).subscribe(
			(result) => {
				this.gotoAgentList();
				this.error = "";
			},
			(error) => {
				// Conflict
				if (error.status === 409) {
					this.error = "Le CIN ou username est déja utilisé.";
				}
			}
		);
	}

	gotoAgentList() {
		this.router.navigate([
			"/overview/agence/" + this.idAgence + "/agent/all",
		]);
	}
}
