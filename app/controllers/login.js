'use strict';

// Dependencies
var Researcher = require('../models/researcher');
var passport = require('passport');

var page = 'login';

module.exports = {
  authenticate: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if (err || !user) {
        res.status(400).send(info);
      } else {
        delete user.password;

        req.login(user, function(err) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.redirect('/researcher/dashboard');
          }
        });
      }
    })(req, res);
  },
  renderPage: function(req, res) {
    if (req.user) {
      res.redirect('/researcher/dashboard');
    } else {
      res.render(page, {
        user: req.user ? req.user.toJSON() : null
      });
    }
  }
}
