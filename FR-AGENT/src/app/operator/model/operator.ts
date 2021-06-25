import { Agent } from 'src/app/shared/models/agent';
import { Compte } from 'src/app/shared/models/compte.model';

export class Operator {
	nom: string;
	email: string;
	logo: string;
	compte: Compte;
	cretationAgent: Agent;
}
