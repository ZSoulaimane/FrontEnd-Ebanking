import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/account/model/account';
import { AccountService } from 'src/app/account/service/account.service';
import { Transfer } from 'src/app/transfer/model/transfer';
import { VirementMultipleBen } from '../../model/virement-multiple-ben';
import { Virementmultiple } from '../../model/virementmultiple';
import { BeneficiaireService } from '../../service/beneficiaire.service';
import { VirementmultipleService } from '../../service/virementmultiple.service';

@Component({
  selector: 'app-virementmultiple',
  templateUrl: './virementmultiple.component.html',
  styleUrls: ['./virementmultiple.component.css'],
})
export class VirementmultipleComponent implements OnInit {
  currntCompte: Account;
  virementMultiple: Virementmultiple;
  idClient: string;
  idCurrentCompte: string;
  nombre: string = '0';
  beneficiairesForm: FormGroup;
  compte: Account;
  compteTemp: VirementMultipleBen;
  sommeMulti: number = 0;
  displayedColumns: string[] = [
    'id',
    'numero',
    'devise',
    'proprietaire',
    'ajouter',
  ];
  displayedColumnsAjout: string[] = [
    'id',
    'numero',
    'proprietaire',
    'somme',
    'actions',
  ];
  nombreSuperieur = false;
  inputsIds: any = {};
  beneficiaires: Account[] = [];
  beneficiairesAjout: VirementMultipleBen[] = [];
  accounttemp: Account;
  accountMtemp: VirementMultipleBen;
  dataSource = new MatTableDataSource<Account>(this.beneficiaires);
  dataSourceAjout = new MatTableDataSource<VirementMultipleBen>(
    this.beneficiairesAjout
  );
  constructor(
    private beneficiaireService: BeneficiaireService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private virmenetMultipleService: VirementmultipleService
  ) {
    this.idClient = sessionStorage.getItem('currentClientId');
    this.beneficiairesForm = new FormGroup({
      numero: new FormControl(),
      somme: new FormControl('', Validators.required),
    });
  }
  get numero() {
    return this.beneficiairesForm.get('numero');
  }
  get somme() {
    return this.beneficiairesForm.get('somme');
  }
  change(event) {
    this.nombre = event.target.value;
  }

  ngOnInit(): void {
    this.idCurrentCompte = this.route.snapshot.params['id'];
    this.accountService
      .findAccountById(this.idCurrentCompte)
      .subscribe((data) => {
        this.currntCompte = data[0];
      });
    // recuperer tous les beneficiaires
    this.beneficiaireService.findAll(this.idClient).subscribe(
      (data) => {
        this.beneficiaires = data;
        this.dataSource = new MatTableDataSource<Account>(this.beneficiaires);
      },
      (error) => {
        this.dataSource = new MatTableDataSource<Account>(null);
      }
    );
  }

  ajouter(compte: any) {
    this.numero.setValue(compte.numero);
  }

  ajouteraListe() {
    this.compteTemp = new VirementMultipleBen();
    this.compte = this.beneficiaires.find(
      (x) => x.numero === this.numero.value
    );
    this.compteTemp.creancier = this.compte;
    this.compteTemp.montant = this.somme.value;

    if (this.nombre === '0') {
      alert("S'il vous plait entrer le nombre de beneficiaire");
    } else if (this.beneficiairesAjout.find((x) => x === this.compteTemp)) {
      alert('Ce compte est deja dans la liste');
    } else if (this.nombre === this.beneficiairesAjout.length.toString()) {
      alert(
        'Vous avez exactement ' + this.nombre + ' beneficiaires dans la liste'
      );
    } else {
      if (this.checkbalance() <= this.currntCompte.solde) {
        this.sommeMulti = this.checkbalance();
        this.beneficiairesAjout.push(this.compteTemp);
        this.dataSourceAjout.data = this.beneficiairesAjout;
      } else {
        alert('La somme depasse votre solde.');
      }
    }
    console.log('ADDED VRM MULTI:', this.compteTemp);
  }

  checkbalance() {
    let val = 0;
    for (var j = 0; j < this.beneficiairesAjout.length; j++) {
      val += parseInt(this.beneficiairesAjout[j].montant);
    }
    val += parseInt(this.somme.value);
    return isNaN(val) ? 0 : val;
  }

  supprimerdeListe(compte: any) {
    let index = this.beneficiairesAjout.findIndex((x) => x === compte); //find index in your array
    this.beneficiairesAjout.splice(index, 1); //remove element from array
    this.dataSourceAjout.data = this.beneficiairesAjout;
  }
  viements: Transfer[] = [];
  effectuer() {
    this.virementMultiple = new Virementmultiple();
    this.virementMultiple.nombreBeneficiaires = this.nombre;
    this.virementMultiple.debiteur = this.currntCompte;
    this.virementMultiple.creanciers = this.beneficiairesAjout;
    this.virementMultiple.sommeEnv = this.checkbalance;
    this.virmenetMultipleService.save(this.virementMultiple).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
