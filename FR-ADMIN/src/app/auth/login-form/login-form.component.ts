import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";

@Component({
	selector: "app-login-form",
	templateUrl: "./login-form.component.html",
	styleUrls: ["./login-form.component.css"],
})
export class LoginFormComponent implements OnInit {
	form: FormGroup | any;
	loginInvalid: boolean = false;
	hide: any = "password";

	get username() {
		return this.form.get("username");
	}
	get password() {
		return this.form.get("password");
	}
	constructor(
		private router: Router,
		private fb: FormBuilder,
		private authService: LoginService
	) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			username: new FormControl("", Validators.required),
			password: new FormControl("", Validators.required),
		});
	}

	checkLogin() {
		if (this.username && this.password) {
			this.authService
				.login(this.username.value, this.password.value)
				.subscribe(
					(data: any) => {
						this.loginInvalid = false;
						this.router.navigate(["/overview/agence/all"]);
					},
					(error) => {
						this.loginInvalid = true;
					}
				);
		}
	}
}
