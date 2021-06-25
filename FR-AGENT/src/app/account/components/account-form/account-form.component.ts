import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { Currency } from 'src/app/shared/models/currency';
import { Client } from 'src/app/client/model/client';
import { ClientService } from 'src/app/client/service/client.service';
import { Account } from '../../model/account';
import { CurrencyConversionService } from 'src/app/shared/services/currency-conversion.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css'],
})
export class AccountFormComponent implements OnInit {
  codeId: string;
  client: Client;
  account: Account;
  accounts: Account[];
  currencies: Currency[];
  accountForm = new FormGroup({
    type: new FormControl('', Validators.required),
    devise: new FormControl('', Validators.required),
  });

  get type() {
    return this.accountForm.get('type');
  }

  get devise() {
    return this.accountForm.get('devise');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private clientService: ClientService,
    private currencyService: CurrencyConversionService
  ) {}

  ngOnInit(): void {
    this.codeId = this.route.snapshot.params['id'];
    this.clientService.findClient(this.codeId).subscribe(
      (data) => {
        this.client = data[0];
      },
      (error) => {
        console.log(error);
      }
    );
    this.currencyService.findAllCurrencies().subscribe(
      (data) => {
        this.currencies = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.account = this.accountForm.value;
    this.account.proprietaire = this.client;
    this.accountService
      .save(this.account)
      .subscribe((result) => this.gotoAccountList());
  }

  gotoAccountList() {
    this.router.navigate(['/client/' + this.codeId + '/accounts']);
  }

  reset() {
    this.accountForm.reset();
  }
}
