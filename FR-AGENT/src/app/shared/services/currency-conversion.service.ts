import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RateResponse } from '../models/rate-response';
import { Currency } from '../models/currency';
export const InterceptorSkip = 'X-Skip-Interceptor';
export const InterceptorSkipHeader = new HttpHeaders({
  'X-Skip-Interceptor': '',
});

@Injectable({
  providedIn: 'root',
})
export class CurrencyConversionService {
  apiURL = 'http://localhost:8081/devise';

  constructor(private http: HttpClient) {}
  getRate(code_src: string, code_dest: string): Observable<any> {
    return this.http.get<Currency[]>(
      this.apiURL + '/convert/' + code_src + '/' + code_dest
    );
  }
  public findAllCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiURL + '/all');
  }
}
