export type DisposalClaim = {
	user_id: string;
	operator_id: string;
	token: string;
	credits: number;
	is_claimed: boolean;
	weight: number;
	disposals: number;
};

export type Disposal = {
	credits: number;
	weight: number;
	disposal_type: DisposalType;
};

export enum DisposalType {
	RECYCLABLE = 0,
	BATTERY = 1,
	SPONGE = 2,
	ELECTRONIC = 3,
}
