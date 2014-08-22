'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../app/models/researcher');

module.exports = function() {
  // Use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, done) {
      new User({username: username})
        .fetch()
        .exec(function(err, model) {
        if (err) {
          return done(err);
        }
        if (!model) {
          return done(null, false, {
            message: 'Unknown user'
          });
        }
        if (!model.authenticate(password)) {
          return done(null, false, {
            message: 'Invalid password'
          });
        }

        return done(null, user);
      });
    }
  ));
};
