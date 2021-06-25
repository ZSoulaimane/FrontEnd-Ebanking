import { Client } from "src/app/client/model/client";
import { Agence } from "src/app/shared/models/agence.model";

export class Rdv {
  id: string | any;
  dateRdv: string | any;
  heureRdv: string | any;
  client: Client;
  agence: Agence;
  service: string;
}
