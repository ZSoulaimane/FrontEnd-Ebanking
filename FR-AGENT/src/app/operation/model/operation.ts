import { Currency } from 'src/app/shared/models/currency';
import { Account } from 'src/app/account/model/account';

export class Operation {
  id: number;
  compte: Account;
  date: Date;
  sommeEspece: number;
  sommeCompte: number;
  devise: Currency;
  type: string;
}
