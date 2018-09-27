const stripe = require('../stripe');
const platform = require('connect-platform');


platform.core.node({
  path: '/stripe/charges/capture',
  public: false,
  inputs: [
    'identifier',
    'data'
  ],
  outputs: [
    'charge',
  ],
  controlOutputs: [
    'error',
  ],
  hints: {
    node: 'Capture the charge with the <span class="hl-blue">identifier</span>.',
    inputs: {
      identifier: 'A charge <span class="hl-blue">identifier</span>.',
      data: 'Extra <span class="hl-blue">data</span>.',
    },
    outputs: {
      charge: 'The updated <span class="hl-blue">charge</span> object that was returned by the API.'
    },
    controlOutputs: {
      error: 'The error flag to indicate if an error happened',
    }
  }
}, (inputs, output, control) => {
  stripe.charges
  .capture(inputs.identifier, inputs.data)
  .then(function(charge) {
    output('charge', charge);
  })
  .catch(function(err){
    console.log(err);
    control('error');
  });
});