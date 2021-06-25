import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  role: string;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private authentificationService: AuthentificationService
  ) {}

  ngOnInit() {
    /* this.role = sessionStorage.getItem('role'); */
  }
  logOut() {
    this.authentificationService.logOut();
    this.router.navigate(['']);
  }
}
