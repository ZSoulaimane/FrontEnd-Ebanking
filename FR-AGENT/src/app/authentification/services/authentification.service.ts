import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Agent } from 'src/app/shared/models/agent';
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
      .get<Agent>('http://localhost:8081/agent/username/' + username, {
        headers,
      })
      .pipe(
        map((userData) => {
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('name', userData.nom);
          sessionStorage.setItem('agency', userData.agence.id.toString());
          sessionStorage.setItem('currentAgentId', userData.id.toString());

          let authString = 'Basic ' + btoa(username + ':' + password);
          sessionStorage.setItem('basicauth', authString);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('agency');
    sessionStorage.removeItem('currentAgentId');
    sessionStorage.removeItem('basicauth');
  }
}
