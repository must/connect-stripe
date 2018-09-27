const stripe = require('../stripe');
const platform = require('connect-platform');


platform.core.node({
  path: '/stripe/charges/retrieve',
  public: false,
  inputs: [
    'identifier',
  ],
  outputs: [
    'charge',
  ],
  controlOutputs: [
    'error',
  ],
  hints: {
    node: 'Retrieve a charge based on the charge <span class="hl-blue">identifier</span>.',
    inputs: {
      identifier: 'A charge <span class="hl-blue">identifier</span>.',
    },
    outputs: {
      charge: 'The <span class="hl-blue">charge</span> object that was returned by the API.'
    },
    controlOutputs: {
      error: 'The error flag to indicate if an error happened',
    }
  }
}, (inputs, output, control) => {
  stripe.charges
  .retrieve(inputs.identifier)
  .then(function(charge) {
    output('charge', charge);
  })
  .catch(function(err){
    console.log(err);
    control('error');
  });
});