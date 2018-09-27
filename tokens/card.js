const stripe = require('../stripe');
const platform = require('connect-platform');


platform.core.node({
  path: '/stripe/tokens/card',
  public: false,
  inputs: [
    'number',
    'exp_month',
    'exp_year',
    'cvc',
    'extra',
  ],
  outputs: [
    'response',
  ],
  controlOutputs: [
    'error',
  ],
  hints: {
    node: 'Creates card token based on the <span class="hl-blue">card data</span> passed as input.',
    inputs: {
      number: 'The credit/debit card <span class="hl-blue">number</span>.',
      exp_month: 'The expiration month of the card.',
      exp_year: 'The expiration year of the card.',
      cvc: 'The cvc of the card.',
      extra: 'Extra data that can be appended to the request following the Stripe API specification.',
    },
    outputs: {
      response: 'The <span class="hl-blue">response</span> object that was returned by the API.',
    },
    controlOutputs: {
      error: 'The error flag to indicate if an error happened',
    }
  }
}, (inputs, output, control) => {
  stripe.tokens
  .create({
    card: Object.assign({
      "number": inputs.number,
      "exp_month": inputs.exp_month,
      "exp_year": inputs.exp_year,
      "cvc": inputs.cvc
    }, inputs.extra)
  })
  .then(function(response) {
    output('response', response);
  })
  .catch(function(err){
    console.log(err);
    control('error');
  });;
});