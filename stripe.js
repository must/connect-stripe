const path = require('path');
const nodeStripe = require('stripe');

const platform = require('connect-platform');


let config = platform.config.get('stripe', {});

let stripe;

// Check the existence of both needed API keys
if (config.APIKey) {
  // Setup our stripe instance
  stripe = nodeStripe(config.APIKey);
} else {
  console.log('Missing stripe API key');
}

module.exports = stripe;