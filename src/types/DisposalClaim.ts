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
	RECYCLABLE = 0,
	BATTERY = 1,
	SPONGE = 2,
	ELECTRONIC = 3,
}
