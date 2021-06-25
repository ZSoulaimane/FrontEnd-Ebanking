import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/account/model/account';
import { BeneficiaireService } from '../../service/beneficiaire.service';

@Component({
  selector: 'app-ajouter-beneficiaire',
  templateUrl: './ajouter-beneficiaire.component.html',
  styleUrls: ['./ajouter-beneficiaire.component.css']
})
export class AjouterBeneficiaireComponent implements OnInit {


  idClient: string;
  accountNotFound = false;
  beneficiairesForm: FormGroup;
  displayedColumns: string[] = [
    'id',
    'numero',
    'devise',
    'proprietaire',
    'supprimer'
  ];

  beneficiaires: Account[] = []; 
  dataSource = new MatTableDataSource<Account>(this.beneficiaires);
  constructor(
    private beneficiaireService: BeneficiaireService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.idClient = sessionStorage.getItem('currentClientId');
    this.beneficiairesForm = new FormGroup({
      numero: new FormControl()
   });
  }

  ngOnInit(): void {
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

  get numero(){
    return this.beneficiairesForm.get("numero");
  }
  ajouterCompte(){
    this.beneficiaireService.save(this.numero.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
    this.dataSource.data = this.beneficiaires;

  }

  supprimerCompte(id: any){
    this.beneficiaireService.delete(id).subscribe(
      (Response) => {
        console.log(id);
      },
      (error) => {
        console.error(error)
      }
    );
    this.dataSource.data = this.beneficiaires;
  }

}
