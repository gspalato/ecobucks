export type DisposalClaim = {
	userId: string;
	operatorId: string;
	token: string;
	credits: number;
	isClaimed: boolean;
	weight: number;
	disposals: number;
};

export type Disposal = {
	credits: number;
	weight: number;
	disposalType: DisposalType;
};

export enum DisposalType {
	RECYCLABLE = 'RECYCLABLE',
	BATTERY = 'BATTERY',
	SPONGE = 'SPONGE',
	ELECTRONIC = 'ELECTRONIC',
}
