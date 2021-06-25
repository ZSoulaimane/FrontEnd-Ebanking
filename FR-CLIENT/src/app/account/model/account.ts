import { Currency } from 'src/app/shared/models/currency';
import { Client } from 'src/app/client/model/client';

export class Account {
  id: number;
  numero: string;
  type: string;
  solde: number;
  devise: Currency;
  proprietaire: Client;
}
