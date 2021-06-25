import { Component, OnInit, ViewChild } from '@angular/core';
import { Transfer } from '../../model/transfer';
import { TransferService } from '../../service/transfer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account/service/account.service';
import { CurrencyConversionService } from 'src/app/shared/services/currency-conversion.service';
import { Account } from 'src/app/account/model/account';
import { TransferState } from '@angular/platform-browser';
import { Quotes } from 'src/app/shared/models/quotes';
import { RateResponse } from 'src/app/shared/models/rate-response';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Abonne } from '../../model/abonne';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../../client/model/client';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css'],
})
export class TransferFormComponent implements OnInit {
  devise1: string;
  devise2: string;
  midpoint: number;
  accountNotFound = false;
  codeId: string;
  transferForm: FormGroup;
  transfer: Transfer;
  account1: Account;
  account2: Account;

  get id() {
    return this.transferForm.get('id');
  }
  get numero() {
    return this.transferForm.get('numero');
  }
  get somme() {
    return this.transferForm.get('somme');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transferService: TransferService,
    private accountService: AccountService,
    private currencyService: CurrencyConversionService,
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {
    this.account1 = new Account();
    this.transfer = new Transfer();
    this.account2 = new Account();
  }

  onSubmit() {
    this.accountService.findAccountByNum(this.numero.value).subscribe(
      (data) => {
        // get l account lash bghit nsift
        this.account2 = data;
        this.devise2 = this.account2.devise.code;
        this.currencyService.getRate(this.devise1, this.devise2).subscribe(
          (data) => {
            // get the rate
            this.midpoint = data;
            // 3mr transfer
            this.transfer.creancier = this.account2;
            this.transfer.debiteur = this.account1;
            this.transfer.sommeEnv = parseInt(this.somme.value);
            this.transfer.sommeRecu =
              parseInt(this.somme.value) * this.midpoint;

            this.transferService
              .save(this.transfer)
              .subscribe((result) => this.goToTransferComplete());
          },
          (error) => console.error(error)
        );
      },
      (error) => {
        this.accountNotFound = true;
        console.log('acc not found', this.accountNotFound);
        this.transferForm.controls.numero.setErrors({ incorrect: true });
      }
    );
  }

  goToTransferComplete() {
    this.router.navigate(['/virementEffectue/' + this.codeId]);
  }

  ngOnInit(): void {
    const regexPattern = /\-?\d*\.?\d{1,2}/;
    // form pour virement simple
    this.transferForm = new FormGroup({
      numero: new FormControl('', Validators.required),
      somme: new FormControl('', [
        Validators.required,
        Validators.pattern(regexPattern),
      ]),
    });

    this.codeId = this.route.snapshot.params.id;
    this.accountService.findAccountById(this.codeId).subscribe(
      (data) => {
        this.account1 = data[0];
        this.devise1 = this.account1.devise.code;

        this.transferForm = new FormGroup({
          numero: new FormControl('', Validators.required),
          somme: new FormControl('', [
            Validators.required,
            Validators.pattern(regexPattern),
            Validators.max(this.account1.solde),
          ]),
        });
      },
      (error) => console.error(error)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: 'Confirmer ce virement?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onSubmit();
      }
    });
  }
}
