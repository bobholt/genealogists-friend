'use strict';

// Dependencies
var Researcher = require('../models/researcher');
var passport = require('passport');
var errorHandler = require('./errors');
var bcrypt = require('bcrypt');

var page = 'register';

module.exports = {
  register: function(req, res) {

    // For security measures we remove the roles from the req.body object
    delete req.body.roles;
    delete req.body['confirm-password'];

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    // Init Variables
    var user = new Researcher(req.body);

    user.set({
      provider: 'local',
      displayName: ''
    });

    // Add missing user fields
    // Then save the user
    user.save().then(function() {
      var userJSON = user.toJSON();

      // Remove sensitive data before login
      delete userJSON.password;

      req.login(userJSON, function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.redirect('/dashboard');
        }
      });
    }).catch(function(err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
}
