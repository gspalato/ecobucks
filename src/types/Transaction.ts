import { TransactionType } from './TransactionType';

export type Transaction = {
	transactionType: TransactionType;
	userId: string;
	claimId: string;
	credits: number;
	timestamp: number;
	description: string;
	id: string;
};
