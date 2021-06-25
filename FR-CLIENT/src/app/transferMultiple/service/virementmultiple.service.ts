import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Virementmultiple } from '../model/virementmultiple';

@Injectable({
  providedIn: 'root'
})
export class VirementmultipleService {

  private transferUrl: string;
  constructor(private http: HttpClient) {
    this.transferUrl = 'http://localhost:8081/virementsMultiples';
  }

  public save(transfer: Virementmultiple) {
    return this.http.post<Virementmultiple>(this.transferUrl, transfer);
  }
}
