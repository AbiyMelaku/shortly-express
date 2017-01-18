var db = require('../config');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false,

  initialize: function() {
    this.on('creating', this.hashPassword);
  },

  comparePassword: function(attemptedPassword, callback) {
    console.log('Comparing password');
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, correct) {
      callback(correct);
    });
  }, 

  hashPassword: function() {
    var asyncHash = Promise.promisify(bcrypt.hash);
    return asyncHash(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    });

  }, 
});

module.exports = User;