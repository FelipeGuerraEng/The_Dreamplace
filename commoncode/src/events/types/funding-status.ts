export enum FundingStatus {
  // When the funding has been created, but the
  // dreamticket it is trying to funding has not been reserved
  Created = 'created',

  // The dreamticket the funding is trying to reserve has already
  // been reserved, or when the user has canceled the funding.
  // The funding expires before payment
  canceled = 'canceled',

  // The funding has successfully reserved the dreamticket
  AwaitingPayment = 'awaiting:payment',

  // The funding has reserved the dreamticket and the user has
  // provided payment successfully
  Complete = 'complete',
}
