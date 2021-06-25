import {Component, OnInit} from '@angular/core';
import {RdvService} from '../../service/rdv.service';
import {Rdv} from '../../model/rdv';
import { MatSelectChange } from '@angular/material/select';
import { Client } from 'src/app/client/model/client';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css']
})
export class RdvComponent implements OnInit {
  todayDate: any;
  bookedDays: Date[];
  myDatePicker: any;
  idClient: any;
  rdv: Rdv;
  service: string;
  client: Client;
  constructor(private rdvService: RdvService) {
  }

  ngOnInit(): void {
    this.idClient = sessionStorage.getItem('currentClientId');
    this.todayDate = new Date();
    this.getbookedDays();
    this.rdvService.findAbonneByUsername(sessionStorage.getItem('username')).subscribe(
      data => {
        this.client = data;
      }
    )
  }
  getbookedDays(){
    this.rdvService.findAll().subscribe(
      (data) => {
        this.bookedDays = data.map(obj => new Date(Date.parse(obj.dateRdv.replace(/-/g, '/'))));
      },
      (error) => {
        console.error(error);
      }
    );
  }
  bookedFilter = (d: Date): boolean => {
    const date = d.getDate();
    return !this.bookedDays.find(x => x.getDate() === date);
  }

  selectedValue(event: MatSelectChange) {
    this.service = event.value;
  }
  d: Date;
  
  book(){
    this.d = new Date();
    this.rdv = new Rdv();
    this.rdv.id = this.idClient;
    this.rdv.service = this.service;
    this.rdv.client = this.client;

    this.rdv.dateRdv = this.d.getDate();
    this.rdv.heureRdv = '12:47:24';
    this.rdvService.save(this.rdv).subscribe(
      (response) => {
        console.log("rdv added")
      },
      (error) => {
        console.error(error)
      }
    );
  }
}

