import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Rdv} from '../model/rdv';
import { Client } from 'src/app/client/model/client';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  private clientUrl: string;
  constructor(private http: HttpClient) {
    this.clientUrl = 'http://localhost:8081/rdvs/booked';
  }

  public findAbonneByUsername(username: string){
    return this.http.get<Client>(
      'http://localhost:8081/client/username/' + username + '/'
    );
  }
  public findAll(): Observable<Rdv[]> {
    return this.http.get<Rdv[]>(
      this.clientUrl
    );
  }
  public save(rdv: Rdv) {
    return this.http.post<Rdv>('http://localhost:8081/rdvs', rdv);
  }

  public deleteAbonne(id: string){
    return this.http.delete('http://localhost:8081/rdvs?id=' + id );
  }
}
