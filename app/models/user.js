var db = require('../config');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false,

  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      console.log('Hash Password here or call');
      // var shasum = crypto.createHash('sha1');
      // shasum.update(model.get('password'));
      // model.set('password', shasum.digest('hex').slice(0, 16));
      var saltRounds = 10;
      var asyncHash = Promise.promisify(bcrypt.hash);
      return asyncHash(model.get('password'), null, null).bind(this)
      .then(function(hash) {
        console.log('WE HAVE MADE HASH', hash);
        model.set('password', hash);
      });

    });
  },

  comparePassword: 'value', 

  hashPassword: 'value', 
});

module.exports = User;