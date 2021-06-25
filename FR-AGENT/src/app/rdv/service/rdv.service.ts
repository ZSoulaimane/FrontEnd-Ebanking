import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Rdv} from '../model/rdv';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  private apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:8081/rdvs';
  }
  public findAll(): Observable<Rdv[]> {
    return this.http.get<Rdv[]>(
      this.apiURL
    );
  }
}
