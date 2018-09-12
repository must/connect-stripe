const stripe = require('../stripe');
const platform = require('connect-platform');


platform.core.node({
  path: '/stripe/customers/retrieve',
  public: false,
  inputs: [
    'identifier',
  ],
  outputs: [
    'customer',
  ],
  controlOutputs: [
    'error',
  ],
  hints: {
    node: 'Retrieve a customer based on the customer <span class="hl-blue">identifier</span>.',
    inputs: {
      identifier: 'A customer <span class="hl-blue">identifier</span>.',
    },
    outputs: {
      customer: 'The <span class="hl-blue">customer</span> object that was returned by the API.'
    },
    controlOutputs: {
      error: 'The error flag to indicate if an error happened',
    }
  }
}, (inputs, output, control) => {
  stripe.customers
  .retrieve(inputs.identifier)
  .then(function(customer) {
    output('customer', customer);
  })
  .catch(function(err){
    console.log(err);
    control('error');
  });
});