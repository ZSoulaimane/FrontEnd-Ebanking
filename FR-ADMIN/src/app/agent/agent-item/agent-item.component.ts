import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AgentService } from "../service/agent.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Agent } from "../model/agent.model";
import { Agence } from "src/app/agence/model/agence.model";
import { AgenceService } from "src/app/agence/services/agence.service";

@Component({
	selector: "app-agent-item",
	templateUrl: "./agent-item.component.html",
	styleUrls: ["./agent-item.component.css"],
})
export class AgentItemComponent implements OnInit {
	agent: Agent | any;
	agences: Agence[] | any;
	// id agence
	id: number | any;
	id2: number | any;
	agentForm: FormGroup | any;

	get prenom() {
		return this.agentForm.get("prenom");
	}

	get nom() {
		return this.agentForm.get("nom");
	}

	get password() {
		return this.agentForm.get("password");
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

	get agence() {
		return this.agentForm.get("agence");
	}

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private agentService: AgentService,
		private agenceService: AgenceService
	) {
		this.agentForm = new FormGroup({
			nom: new FormControl("", Validators.required),
			prenom: new FormControl("", Validators.required),
			adresse: new FormControl("", Validators.required),
			telephone: new FormControl("", Validators.required),
			username: new FormControl("", Validators.required),
			password: new FormControl(""),
			email: new FormControl("", [Validators.email, Validators.required]),
			agence: new FormControl("", Validators.required),
		});
	}

	ngOnInit(): void {
		this.id = this.route.snapshot.params["id"];
		this.id2 = this.route.snapshot.params["id2"];
		this.agenceService.getAll().subscribe((data) => {
			this.agences = data;
		});
		this.agentService.findAgent(this.id2).subscribe(
			(data) => {
				this.agent = data[0];
				this.adresse.setValue(this.agent.adresse);
				this.nom.setValue(this.agent.nom);
				this.telephone.setValue(this.agent.telephone);
				this.prenom.setValue(this.agent.prenom);
				this.email.setValue(this.agent.email);
				this.username.setValue(this.agent.username);
				this.agence.setValue(this.agent.agence);
			},
			(error) => console.log(error)
		);
	}

	onSubmit() {
		this.agent = this.agentForm.value;
		this.agent.id = this.id2;
		console.warn(this.agent);
		this.agentService
			.update(this.agent)
			.subscribe((result) => this.gotoAgentList());
	}

	gotoAgentList() {
		this.router.navigate(["/overview/agence/" + this.id + "/agent/all"]);
	}
}
