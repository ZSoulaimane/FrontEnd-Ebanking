import { Component, OnInit, ViewChild } from '@angular/core';
import { Transfer } from '../../model/transfer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TransferService } from '../../service/transfer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Recharge } from 'src/app/recharge/model/recharge';
import { RechargeService } from 'src/app/recharge/service/recharge.service';
import { Rdv } from 'src/app/rdv/model/rdv';
import { AccountService } from 'src/app/account/service/account.service';
import { Account } from 'src/app/account/model/account';
import { Client } from 'src/app/client/model/client';
import { ɵSWITCH_COMPILE_INJECTABLE__POST_R3__ } from '@angular/core';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css'],
})
export class TransferListComponent implements OnInit {
  idCompte: string;
  //transfers
  TRANSFERS: Transfer[] = [];
  chartData: any[];
  view: any[] = [800, 300];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Solde';

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  dataSource = new MatTableDataSource<Transfer>(this.TRANSFERS);
  displayedColumns: string[] = [
    'debiteur',
    'creancier',
    'somme',
    'date',
    'actions',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // Recharges
  RECHARGES: Recharge[];
  dataSource2 = new MatTableDataSource<Recharge>(this.RECHARGES);
  displayedColumns2: string[] = [
    'client',
    'operateur',
    'numero',
    'somme',
    'date',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator2: MatPaginator;
  //Rendez-vous
  RDV: Rdv[];
  dataSource3 = new MatTableDataSource<Rdv>(this.RDV);
  displayedColumns3: string[] = [
    'client',
    'date rendez-vous',
    'heure rendez-vous',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator3: MatPaginator;

  constructor(
    // ajouter rdv service
    private transferService: TransferService,
    private rechargeService: RechargeService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {
    this.idCompte = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    //transfer
    this.transferService.findAllByIdCompte(this.idCompte).subscribe(
      (data) => {
        this.TRANSFERS = data;
        let dummy = new Account();
        let client = new Client();
        client.nom = 'Vous';
        client.prenom = 'même';
        client.id = -1;
        dummy.proprietaire = client;

        this.TRANSFERS.forEach((tr) => {
          if (tr.creancier == null) {
            tr.creancier = dummy;
          }
          if (tr.debiteur == null) {
            tr.debiteur = dummy;
          }
        });
        this.buildChart();

        this.dataSource = new MatTableDataSource<Transfer>(this.TRANSFERS);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.dataSource = new MatTableDataSource<Transfer>(null);
      }
    );
    //recharge
    this.rechargeService.findAll(this.idCompte).subscribe(
      (data) => {
        this.RECHARGES = data;
        this.dataSource2 = new MatTableDataSource<Recharge>(this.RECHARGES);
        this.dataSource2.paginator = this.paginator2;
      },
      (error) => {
        this.dataSource2 = new MatTableDataSource<Recharge>(null);
      }
    );
  }
  checkSender(userID: any) {
    return (
      parseInt(sessionStorage.getItem('currentClientId')) === parseInt(userID)
    );
  }

  getPDF(invoiceId: number) {
    this.transferService.getPDF(invoiceId).subscribe(
      (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);

        // if you want to open PDF in new tab
        window.open(fileURL);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';

        a.download = 'Virement ' + invoiceId + '.pdf';
        document.body.appendChild(a);
        a.click();
      },
      (error) => {
        console.log('getPDF error: ', error);
      }
    );
  }

  buildChart() {
    let dataCh = [];
    let solde = 0;
    console.log(this.TRANSFERS);
    this.TRANSFERS.forEach((tr) => {
      let dateTr = new Date(tr.date).toUTCString();
      if (
        tr.debiteur.proprietaire.id === -1 ||
        parseInt(sessionStorage.getItem('currentClientId')) ===
          tr.creancier.proprietaire.id
      ) {
        // virement recu
        console.log('Recu ' + tr.sommeRecu);
        solde += Math.floor(tr.sommeRecu);
        dataCh.push({
          name: dateTr,
          value: solde,
        });
      } else {
        // virement envoyé
        console.log('Envoyé ' + tr.sommeEnv);
        solde -= Math.floor(tr.sommeEnv);
        dataCh.push({
          name: dateTr,
          value: solde,
        });
      }
    });
    this.chartData = [{ name: 'Solde', series: dataCh }];
    console.log(this.chartData);
  }
  onSelect(event) {
    console.log(event);
  }
}
