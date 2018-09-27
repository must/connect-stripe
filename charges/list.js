const stripe = require('../stripe');
const platform = require('connect-platform');


platform.core.node({
  path: '/stripe/charges/list',
  public: false,
  inputs: [
    'filter',
  ],
  outputs: [
    'charges',
  ],
  controlOutputs: [
    'error',
  ],
  hints: {
    node: 'Retrieve a charge list based on the filter <span class="hl-blue">filter</span>.',
    inputs: {
      filter: 'A <span class="hl-blue">filter</span> object with filter options according to API specificaitons.',
    },
    outputs: {
      charges: 'The <span class="hl-blue">charges</span>\' list object that was returned by the API.'
    },
    controlOutputs: {
      error: 'The error flag to indicate if an error happened',
    }
  }
}, (inputs, output, control) => {
  stripe.charges
  .list(inputs.filter)
  .then(function(charges) {
    output('charges', charges);
  })
  .catch(function(err){
    console.log(err);
    control('error');
  });
});