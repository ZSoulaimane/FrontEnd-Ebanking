import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Agent } from "../model/agent.model";

@Injectable({
	providedIn: "root",
})
export class AgentService {
	private agentUrl: string;
	private agenceUrl: string;
	constructor(private http: HttpClient) {
		this.agentUrl = "http://localhost:8081/agent";
		this.agenceUrl = "http://localhost:8081/agence";
	}

	public findAllAgents(agenceId: string): Observable<Agent[]> {
		return this.http.get<Agent[]>(
			this.agenceUrl + "/" + agenceId + "/agents"
		);
	}

	public findAgent(id: string): Observable<Agent[]> {
		return this.http.get<Agent[]>(this.agentUrl + "s?id=" + id);
	}

	public save(agent: Agent) {
		return this.http.post<Agent>(this.agentUrl + "s", agent);
	}

	public delete(id: number): Observable<any> {
		return this.http.delete(`${this.agentUrl}/${id}`);
	}

	public update(agent: Agent): Observable<any> {
		return this.http.put(`${this.agentUrl}/${agent.id}`, agent);
	}
}
