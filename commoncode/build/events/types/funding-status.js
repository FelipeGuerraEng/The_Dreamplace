'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FundingStatus = void 0;
var FundingStatus;
(function (FundingStatus) {
  // When the funding has been created, but the
  // dreamticket it is trying to funding has not been reserved
  FundingStatus['Created'] = 'created';
  // The dreamticket the funding is trying to reserve has already
  // been reserved, or when the user has canceled the funding.
  // The funding expires before payment
  FundingStatus['canceled'] = 'canceled';
  // The funding has successfully reserved the dreamticket
  FundingStatus['AwaitingPayment'] = 'awaiting:payment';
  // The funding has reserved the dreamticket and the user has
  // provided payment successfully
  FundingStatus['Complete'] = 'complete';
})((FundingStatus = exports.FundingStatus || (exports.FundingStatus = {})));
