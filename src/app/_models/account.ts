import { Beneficiary } from './Beneficiary';

export class Account {
    id: number;
	balance: number;
	debit: number;
	credit: number;;
	userId: number;;
	type: string;
	transactionDate: string;
	creationDate: string;
	beneficiaries: Array<Beneficiary>;
}