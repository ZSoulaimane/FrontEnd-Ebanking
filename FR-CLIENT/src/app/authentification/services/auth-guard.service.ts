import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private router: Router,
    private authService: AuthentificationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn()) return true;

    this.router.navigate(['login']);
    return false;
  }
}
