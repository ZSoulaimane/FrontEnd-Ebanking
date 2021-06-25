import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operator } from '../model/operator';

@Injectable({
	providedIn: 'root',
})
export class OperatorService {
	private operatorUrl: string;
	constructor(private http: HttpClient) {
		this.operatorUrl = 'http://localhost:8081/operateur';
	}
	public findAll(): Observable<Operator[]> {
		return this.http.get<Operator[]>(this.operatorUrl + '/all');
	}

	public getOperation(codeOperateur: any): Observable<any> {
		return this.http.get<any>(
			this.operatorUrl + '/' + codeOperateur + '/operation'
		);
	}
	public save(operator: Operator) {
		return this.http.post<Operator>(this.operatorUrl, operator);
	}
	public delete(id: number): Observable<any> {
		return this.http.delete(`${this.operatorUrl}/${id}`);
	}
	public update(id: any, operator: Operator) {
		return this.http.put(`${this.operatorUrl}/${id}`, operator);
	}
}
