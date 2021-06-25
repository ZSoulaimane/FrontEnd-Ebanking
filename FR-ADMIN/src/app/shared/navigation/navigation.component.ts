import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/auth/services/login.service";

@Component({
	selector: "app-navigation",
	templateUrl: "./navigation.component.html",
	styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent {
	showHeader = true;
	constructor(private router: Router, private loginService: LoginService) {}
	logOut() {
		this.loginService.logOut();
		this.router.navigate([""]);
	}
	ngOnInit() {}
}
