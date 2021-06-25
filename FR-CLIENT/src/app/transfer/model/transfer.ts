import { Account } from 'src/app/account/model/account';

export class Transfer {
  id: number;
  creancier: Account | any;
  debiteur: Account | any;
  sommeEnv: number;
  sommeRecu: number;
  date: Date;
}
