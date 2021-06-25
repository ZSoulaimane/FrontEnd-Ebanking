import { Component, OnInit } from '@angular/core';
import { Account } from '../../model/account';
import { ClientService } from 'src/app/client/service/client.service';
import { Client } from 'src/app/client/model/client';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css'],
})
export class AccountSummaryComponent implements OnInit {
  currentClientId: string;
  currentClientName: string;
  accounts: Account[];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.currentClientId = sessionStorage.getItem('currentClientId');
    this.currentClientName = sessionStorage.getItem('name');
    this.clientService.findClientAccounts(this.currentClientId).subscribe(
      (data) => {
        this.accounts = data;
      },
      (error) => console.error(error)
    );
  }
}
