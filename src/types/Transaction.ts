import { TransactionType } from './TransactionType';

export type Transaction = {
	transaction_type: TransactionType;
	user_id: string;
	claim_id: string;
	credits: number;
	timestamp: number;
	description: string;
	id: string;
};
