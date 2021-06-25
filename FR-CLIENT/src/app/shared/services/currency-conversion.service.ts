import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RateResponse } from '../models/rate-response';
export const InterceptorSkip = 'X-Skip-Interceptor';
export const InterceptorSkipHeader = new HttpHeaders({
  'X-Skip-Interceptor': '',
});

@Injectable({
  providedIn: 'root',
})
export class CurrencyConversionService {
  private rateUrl: string;
  endpoint = 'convert';
  //access_key = 'GpK3N8ueM4Qk182wLdUIoMWx';
  //baseURL = 'https://www1.oanda.com/rates/api/v2/rates/spot.json';

  constructor(private http: HttpClient) {
    this.rateUrl ='http://localhost:8081/';
  }

  public getRate(code_src: string, code_dest: string): Observable<any> {
    return this.http.get<any>(
      'http://localhost:8081/devise/convert/'+code_src+'/'+code_dest
    );
  }
  // getRate(base: string, to: string): Observable<RateResponse> {
  //   return this.http.get<RateResponse>(
  //     this.baseURL +
  //       '?api_key=' +
  //       this.access_key +
  //       '&base=' +
  //       base +
  //       '&quote=' +
  //       to,
  //     {
  //       headers: InterceptorSkipHeader,
  //     }
  //   );
  // }
}
