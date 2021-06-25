import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Admin } from "../model/admin.model";

@Injectable({
	providedIn: "root",
})
export class AdminService {
	private adminUrl: string;

	constructor(private http: HttpClient) {
		this.adminUrl = "http://localhost:8081/admin";
	}
	public getAll(): Observable<Admin[]> {
		return this.http.get<Admin[]>(this.adminUrl + "s");
	}

	public save(agent: Admin) {
		return this.http.post<Admin>(this.adminUrl + "s", agent);
	}

	delete(id: number): Observable<any> {
		return this.http.delete(`${this.adminUrl}/${id}`);
	}
}
