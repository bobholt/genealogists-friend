'use strict';

var passport = require('passport'),
  User = require('../app/models/researcher'),
  path = require('path'),
  utilities = require('./utilities');

module.exports = function() {
  // Serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize sessions
  passport.deserializeUser(function(id, done) {
      new User({id: id})
        .fetch()
        .exec(function(err, user) {
          done(err, user);
        });
  });

  // Initialize strategies
  utilities.getGlobbedFiles('./config/strategies/**/*.js').forEach(function(strategy) {
    require(path.resolve(strategy))();
  });
};
