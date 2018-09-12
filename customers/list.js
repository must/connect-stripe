const stripe = require('../stripe');
const platform = require('connect-platform');


platform.core.node({
  path: '/stripe/customers/list',
  public: false,
  inputs: [
    'filter',
  ],
  outputs: [
    'customers',
  ],
  controlOutputs: [
    'error',
  ],
  hints: {
    node: 'Retrieve a customer list based on the filter <span class="hl-blue">filter</span>.',
    inputs: {
      filter: 'A <span class="hl-blue">filter</span> object with filter options according to API specificaitons.',
    },
    outputs: {
      customers: 'The <span class="hl-blue">customers</span>\' list object that was returned by the API.'
    },
    controlOutputs: {
      error: 'The error flag to indicate if an error happened',
    }
  }
}, (inputs, output, control) => {
  stripe.customers
  .list(inputs.filter)
  .then(function(customers) {
    output('customers', customers);
  })
  .catch(function(err){
    console.log(err);
    control('error');
  });
});