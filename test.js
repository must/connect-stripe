const stripe = require('./stripe');
const platform = require('connect-platform');


platform.core.node({
  path: '/stripe/test',
  public: false,
  inputs: [
    'test'
  ],
  outputs: [
    'test',
  ],
  controlOutputs: [ 
  ],
  hints: {
    node: 'Sends an email using the email <span class="hl-blue">message</span>.',
    inputs: {
      test: 'the email message to send',
    },
    outputs: {
      test: 'The <span class="hl-blue">response</span> object that was returned by the API.'
    },
  }
}, (inputs, output, control) => {
  var customer = stripe.customers.create(
    { email: 'mustapha3892@gmail.com' }
  ).then(function(customer) {
    console.log('--------');
    console.log(inputs);
    //console.log(platform.app);
    /*try {
      let event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      // Do something with event
    }
    catch (err) {
      res.status(400).end()
    }*/
    //console.log(customer);
    output('test', inputs.test);
  });
});