export interface LocationPolicy {

  cleaningPolicyType: string;

  additionalCleaningFee?: number;

  cancellationPolicyType: string;

  minBookingHours?: number;

  instantBookingAllowed: boolean;

  requiresApproval: boolean;

  accessNotes?: string;
}