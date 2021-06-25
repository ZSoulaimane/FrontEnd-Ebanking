import { Client } from './../../client/model/client';
import { Agence } from '../../shared/models/agence.model';
export class Rdv {
	id: string | any;
	client: Client;
	agence: Agence;
	dateRdv: string | any;
	heureRdv: string | any;
	service: string | any;
}
