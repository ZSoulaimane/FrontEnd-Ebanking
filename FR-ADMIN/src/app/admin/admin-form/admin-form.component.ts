import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Admin } from "../model/admin.model";
import { AdminService } from "../service/admin.service";

@Component({
	selector: "app-admin-form",
	templateUrl: "./admin-form.component.html",
	styleUrls: ["./admin-form.component.css"],
})
export class AdminFormComponent implements OnInit {
	title: string = "Formulaire création admin";
	form: FormGroup | any;
	admin: Admin | any;
	admins: Admin[] = [];

	get nom() {
		return this.form.get("nom");
	}
	get prenom() {
		return this.form.get("prenom");
	}
	get email() {
		return this.form.get("email");
	}
	get password() {
		return this.form.get("password");
	}
	get telephone() {
		return this.form.get("telephone");
	}
	get cin() {
		return this.form.get("cin");
	}
	get adresse() {
		return this.form.get("adresse");
	}

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private adminService: AdminService
	) {}
	ngOnInit(): void {
		const regexPhone = /^0[6|7|5]\d{8}$/;
		const regexCIN = /^\w{1,2}\d{1,6}$/;

		this.form = new FormGroup({
			nom: new FormControl("", Validators.required),
			prenom: new FormControl("", Validators.required),
			email: new FormControl("", [Validators.email, Validators.required]),
			username: new FormControl("", Validators.required),
			password: new FormControl("", Validators.required),
			cin: new FormControl("", [
				Validators.required,
				Validators.pattern(regexCIN),
			]),
			adresse: new FormControl("", Validators.required),
			telephone: new FormControl("", [
				Validators.required,
				Validators.pattern(regexPhone),
			]),
		});
	}

	onSubmit() {
		this.admin = this.form.value;
		this.adminService
			.save(this.admin)
			.subscribe((result) => this.gotoAdminList());
	}

	gotoAdminList() {
		this.router.navigate(["/overview/admin/all"]);
	}
}
