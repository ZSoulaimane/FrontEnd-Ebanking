import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Client } from 'src/app/client/model/client';
@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private httpClient: HttpClient) {}

  authentificate(username, password) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.httpClient
      .get<Client>('http://localhost:8081/client/username/' + username, {
        headers,
      })
      .pipe(
        map((userData) => {
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('name', userData.nom);

          sessionStorage.setItem('currentClientId', userData.id.toString());

          let authString = 'Basic ' + btoa(username + ':' + password);
          sessionStorage.setItem('basicauth', authString);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    sessionStorage.clear();
  }
}
