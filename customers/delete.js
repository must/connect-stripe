const stripe = require('../stripe');
const platform = require('connect-platform');


platform.core.node({
  path: '/stripe/customers/delete',
  public: false,
  inputs: [
    'identifier',
  ],
  outputs: [
    'confirmation',
  ],
  controlOutputs: [
    'error',
  ],
  hints: {
    node: 'Delete a customer based on the customer <span class="hl-blue">identifier</span>.',
    inputs: {
      identifier: 'A customer <span class="hl-blue">identifier</span>.',
    },
    outputs: {
      confirmation: 'The <span class="hl-blue">confirmation</span> object that was returned by the API.'
    },
    controlOutputs: {
      error: 'The error flag to indicate if an error happened',
    }
  }
}, (inputs, output, control) => {
  stripe.customers
  .del(inputs.identifier)
  .then(function(confirmation) {
    output('confirmation', confirmation);
  })
  .catch(function(err){
    console.log(err);
    control('error');
  });
});