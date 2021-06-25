import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Currency } from "../model/currency.model";

@Injectable({
	providedIn: "root",
})
export class CurrenciesService {
	private currencyUrl: string;
	constructor(private http: HttpClient) {
		this.currencyUrl = "http://localhost:8081/devise";
	}
	public findAll(): Observable<Currency[]> {
		return this.http.get<Currency[]>(this.currencyUrl + "/all");
	}
	public findCurrency(id: string): Observable<Currency[]> {
		return this.http.get<Currency[]>(`${this.currencyUrl}/${id}`);
	}
	public save(currency: Currency) {
		return this.http.post<Currency>(this.currencyUrl, currency);
	}
	public update(id: string, currency: Currency): Observable<any> {
		return this.http.put(`${this.currencyUrl}/${id}`, currency);
	}
	public delete(id: string): Observable<any> {
		return this.http.delete(`${this.currencyUrl}/${id}`);
	}
}
