import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/account/model/account';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaireService {

  private apiUrl: string;
  constructor(private http: HttpClient) { 
      this.apiUrl = 'http://localhost:8081/';
  }

  public findAll(code: string): Observable<Account[]> {
    return this.http.get<Account[]>('http://localhost:8081/client/'+code+'/beneficiares');
  }

  public save(num_compte_benif: string) {
    return this.http.post<string>(this.apiUrl + 'client/beneficiares', num_compte_benif);
  }

  public delete(id: string){
    return this.http.delete('http://localhost:8081/client/beneficiares/' + id );
  }
  
}
