import { Client } from 'src/app/client/model/client';
import { Currency } from 'src/app/shared/models/currency';

export class Account {
  id: number;
  numero: string;
  type: string;
  solde: number;
  devise: Currency;
  proprietaire: Client;
}
