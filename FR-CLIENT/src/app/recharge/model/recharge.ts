import { Currency } from 'src/app/shared/models/currency';
import { Account } from 'src/app/account/model/account';
import { Operator } from 'src/app/shared/models/operator';
import { Client } from 'src/app/client/model/client';

export class Recharge {
  id: number;
  sommeEnv: number;
  sommeRecu: number;
  devise: Currency;
  telephone: string;
  compte: Account;
  operateur: Operator;
  date: Date;
}
