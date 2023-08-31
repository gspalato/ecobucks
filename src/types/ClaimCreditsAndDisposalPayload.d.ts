import { DisposalClaim } from "./DisposalClaim";

export type ClaimDisposalAndCreditsPayload = {
    successful: boolean;
    error: string;
    disposal: DisposalClaim;
}