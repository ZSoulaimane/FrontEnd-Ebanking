import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Admin } from "src/app/admin/model/admin.model";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class LoginService {
	constructor(private http: HttpClient) {}

	login(username: string, password: string) {
		const authKey = btoa(username + ":" + password);
		const headers = new HttpHeaders({
			Authorization: "Basic " + authKey,
		});
		return this.http
			.get<Admin>("http://localhost:8081/admin/username/" + username, {
				headers,
			})
			.pipe(
				map(
					(userData: any) => {
						console.error("GOT INFOS FROM LOGIN");

						sessionStorage.setItem("username", username);
						sessionStorage.setItem("name", userData.nom);

						sessionStorage.setItem(
							"currentAdminId",
							userData.id.toString()
						);

						sessionStorage.setItem("basicauth", authKey);
						return userData;
					},
					(err: any) => {
						console.log(err);
					}
				)
			);
	}

	isUserLoggedIn() {
		let user = sessionStorage.getItem("username");
		console.log("Checking login ------- Service");
		return !(user === null);
	}

	logOut() {
		sessionStorage.clear();
		window.location.reload();
	}
}
