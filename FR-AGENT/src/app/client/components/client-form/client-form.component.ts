import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Client } from '../../model/client';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  client: Client;
  clients: Client[];
  clientForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    cin: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  get prenom() {
    return this.clientForm.get('prenom');
  }

  get nom() {
    return this.clientForm.get('nom');
  }

  get cin() {
    return this.clientForm.get('cin');
  }

  get adresse() {
    return this.clientForm.get('adresse');
  }
  get telephone() {
    return this.clientForm.get('telephone');
  }

  get username() {
    return this.clientForm.get('username');
  }

  get email() {
    return this.clientForm.get('email');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.client = this.clientForm.value;
    console.log(this.client);
    this.clientService
      .save(this.client)
      .subscribe((result) => this.gotoClientList());
  }

  gotoClientList() {
    this.router.navigate(['/clients']);
  }

  reset() {
    this.clientForm.reset();
  }
}
