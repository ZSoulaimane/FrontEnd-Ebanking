import { Injectable } from '@angular/core';
import { Transfer } from '../model/transfer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../client/model/client';
import { Abonne } from '../model/abonne';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private transferUrl: string;
  constructor(private http: HttpClient) {
    this.transferUrl = 'http://localhost:8081/virement';
  }
  public findAllByIdCompte(idCompte: string): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(
      'http://localhost:8081/compte/' + idCompte + '/virements'
    );
  }

  public save(transfer: Transfer) {
    return this.http.post<Transfer>(this.transferUrl + 's', transfer);
  }
  getPDF(invoiceId: number): Observable<Blob> {
    return this.http.get<Blob>(this.transferUrl + 'PDF/' + invoiceId, {
      responseType: 'blob' as 'json',
    });
  }

  public findAbonneByUsername(username: string) {
    return this.http.get<Client>(
      'http://localhost:8081/client/username/' + username + '/'
    );
  }
  public postAbonne(abonne: Abonne) {
    return this.http
      .post<Abonne>('http://localhost:8081/compte/abonnes', abonne)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }
  public deleteAbonne(id: string) {
    return this.http
      .delete('http://localhost:8081/compte/abonnes/' + id)
      .subscribe();
  }

  public findAllAbonne(id: string): Observable<Abonne[]> {
    return this.http.get<Abonne[]>(
      'http://localhost:8081/compte/' + id + '/virementForm/'
    );
  }
}
