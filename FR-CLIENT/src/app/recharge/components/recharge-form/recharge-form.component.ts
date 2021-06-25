import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Recharge } from '../../model/recharge';
import { RateResponse } from 'src/app/shared/models/rate-response';
import { ActivatedRoute, Router } from '@angular/router';
import { RechargeService } from '../../service/recharge.service';
import { AccountService } from 'src/app/account/service/account.service';
import { CurrencyConversionService } from 'src/app/shared/services/currency-conversion.service';
import { MatDialog } from '@angular/material/dialog';
import { Account } from 'src/app/account/model/account';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ClientService } from 'src/app/client/service/client.service';
import { Operator } from 'src/app/shared/models/operator';

@Component({
  selector: 'app-recharge-form',
  templateUrl: './recharge-form.component.html',
  styleUrls: ['./recharge-form.component.css'],
})
export class RechargeFormComponent implements OnInit {
  devise1: string;
  devise2: string;
  midpoint: number;
  codeId: string;

  rechargeForm: FormGroup;
  recharge: Recharge;

  account1: Account;
  account2: Account;
  rates: RateResponse;

  operators: Operator[];

  get id() {
    return this.rechargeForm.get('id');
  }
  get operateur() {
    return this.rechargeForm.get('operateur');
  }
  get sommeEnv() {
    return this.rechargeForm.get('sommeEnv');
  }
  get numero() {
    return this.rechargeForm.get('numero');
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rechargeService: RechargeService,
    private accountService: AccountService,
    private currencyService: CurrencyConversionService,
    private clientService: ClientService,
    public dialog: MatDialog
  ) {
    const regexPattern = /\-?\d*\.?\d{1,2}/;
    this.account1 = new Account();
    this.recharge = new Recharge();
    this.account2 = new Account();
    this.codeId = this.route.snapshot.params['id'];
    this.rechargeForm = new FormGroup({
      telephone: new FormControl('', Validators.required),
      operateur: new FormControl('', Validators.required),
      sommeEnv: new FormControl('', [
        Validators.required,
        Validators.pattern(regexPattern),
      ]),
    });
    this.accountService.findAccountById(this.codeId).subscribe(
      (data) => {
        this.account1 = data[0];
        this.devise1 = this.account1.devise.code;
      },
      (error) => console.error(error)
    );

    this.clientService.findOperators().subscribe(
      (data) => {
        this.operators = data;
      },
      (error) => console.error(error)
    );
  }

  onSubmit() {
    this.recharge = this.rechargeForm.value;
    this.recharge.compte = this.account1;
    this.clientService
      .findClientAccounts(this.recharge.operateur.id.toString())
      .subscribe(
        (data) => {
          this.recharge.devise = data[0].devise;
          this.devise2 = data[0].devise.code;

          this.currencyService.getRate(this.devise1, this.devise2).subscribe(
            (data) => {
              //get the rate
              this.rates = data;
              this.midpoint = this.rates.quotes[0].midpoint;
              // 3mr recharge

              this.recharge.sommeRecu = this.recharge.sommeEnv * this.midpoint;
              this.rechargeService
                .save(this.recharge)
                .subscribe((result) => this.goToRechargeComplete());
            },
            (error) => console.error(error)
          );
        },
        (error) => console.error(error)
      );
  }

  goToRechargeComplete() {
    this.router.navigate(['/compte/' + this.codeId + '/virements']);
  }

  ngOnInit(): void {}
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: 'Confirmer cette recharge?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onSubmit();
      }
    });
  }
}
