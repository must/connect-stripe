module.exports.platform = {
  config : {
    nodes : {
      native : [
        'test',
        
        'customers/create',
        'customers/retrieve',
        'customers/update',
        'customers/delete',
        'customers/list',
        'customers/charge',

        'charges/create',
        'charges/retrieve',
        'charges/update',
        'charges/capture',
        'charges/list',

        'tokens/card',
      ]
    },
    aliases: {
    }
  }
}
