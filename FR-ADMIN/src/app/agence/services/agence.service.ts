import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Agence } from "../model/agence.model";

@Injectable({
	providedIn: "root",
})
export class AgenceService {
	agenceUrl = "http://localhost:8081/agence";

	constructor(private http: HttpClient) {}

	public getAll(): Observable<Agence[]> {
		return this.http.get<Agence[]>(this.agenceUrl + "s");
	}

	public save(agent: Agence) {
		return this.http.post<Agence>(this.agenceUrl + "s", agent);
	}

	public delete(id: number): Observable<any> {
		return this.http.delete(`${this.agenceUrl}/${id}`);
	}

	public update(id: string, agence: Agence): Observable<any> {
		return this.http.put(`${this.agenceUrl}/${id}`, agence);
	}

	public getAgence(id: string): Observable<Agence[]> {
		return this.http.get<Agence[]>(this.agenceUrl + "s?id=" + id);
	}
}
