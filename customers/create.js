const stripe = require('../stripe');
const platform = require('connect-platform');


platform.core.node({
  path: '/stripe/customers/create',
  public: false,
  inputs: [
    'data',
  ],
  outputs: [
    'response',
  ],
  controlOutputs: [
    'error',
  ],
  hints: {
    node: 'Creates customer based on the <span class="hl-blue">data</span> passed as input.',
    inputs: {
      data: 'A <span class="hl-blue">data object</span> following the Stripe API specification.',
    },
    outputs: {
      response: 'The <span class="hl-blue">response</span> object that was returned by the API.',
    },
    controlOutputs: {
      error: 'The error flag to indicate if an error happened',
    }
  }
}, (inputs, output, control) => {
  stripe.customers
  .create(inputs.data)
  .then(function(response) {
    output('response', response);
  })
  .catch(function(err){
    console.log(err);
    control('error');
  });;
});