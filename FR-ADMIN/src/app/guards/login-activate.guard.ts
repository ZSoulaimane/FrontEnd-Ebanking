import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../auth/services/login.service";

@Injectable({
	providedIn: "root",
})
export class LoginActivateGuard implements CanActivate {
	constructor(private loginService: LoginService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		if (!this.loginService.isUserLoggedIn()) {
			this.router.navigate(["login"]);
		}
		return true;
	}
}
