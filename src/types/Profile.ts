import { Transaction } from './Transaction';

export type Profile = {
	id: string;
	name: string;
	username: string;
	credits: number;
	isOperator: boolean;
	transactions: Transaction[];
};
