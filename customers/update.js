const stripe = require('../stripe');
const platform = require('connect-platform');


platform.core.node({
  path: '/stripe/customers/update',
  public: false,
  inputs: [
    'identifier',
    'data',
  ],
  outputs: [
    'customer',
  ],
  controlOutputs: [
    'error',
  ],
  hints: {
    node: 'Update a customer based on the customer <span class="hl-blue">identifier</span>.',
    inputs: {
      identifier: 'A customer <span class="hl-blue">identifier</span>.',
      data: 'A <span class="hl-blue">data object</span> following the Stripe API specification.',
    },
    outputs: {
      customer: 'The updated <span class="hl-blue">customer</span> object that was returned by the API.'
    },
    controlOutputs: {
      error: 'The error flag to indicate if an error happened',
    }
  }
}, (inputs, output, control) => {
  stripe.customers
  .update(inputs.identifier, inputs.data)
  .then(function(customer) {
    output('customer', customer);
  })
  .catch(function(err){
    console.log(err);
    control('error');
  });
});