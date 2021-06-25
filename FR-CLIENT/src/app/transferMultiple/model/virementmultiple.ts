import { Account } from "src/app/account/model/account";
import { VirementMultipleBen } from "./virement-multiple-ben";

export class Virementmultiple {
    id: any;
    debiteur: Account;
    creanciers: VirementMultipleBen[];
    date: Date;
    sommeEnv: any;
    nombreBeneficiaires: any;
}
