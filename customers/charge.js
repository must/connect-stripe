const stripe = require('../stripe');
const platform = require('connect-platform');


platform.core.node({
  path: '/stripe/customers/charge',
  public: false,
  inputs: [
    'amount',
    'currency',
    'customer',
    'data',
  ],
  outputs: [
    'response',
  ],
  controlOutputs: [
    'error',
  ],
  hints: {
    node: 'Creates a charge with the <span class="hl-blue">amount</span>, <span class="hl-blue">currency</span> and the extra <span class="hl-blue">data</span> passed as input.',
    inputs: {
      amount: 'The <span class="hl-blue">amount</span> to charge.',
      currency: 'The <span class="hl-blue">currency</span> of the amount to be charged.',
      customer: 'A <span class="hl-blue">customer</span> following the Stripe API specification.',
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
  inputs.data.amount = inputs.amount;
  inputs.data.currency = inputs.currency;
  inputs.data.customer = inputs.customer;

  stripe.charges
  .create(inputs.data)
  .then(function(response) {
    output('response', response);
  })
  .catch(function(err){
    console.log(err);
    control('error');
  });;
});