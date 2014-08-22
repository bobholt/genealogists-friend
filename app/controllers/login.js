'use strict';

// Dependencies
var Researcher = require('../models/researcher');
var passport = require('passport');

module.exports.post = function(req, res) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  });
};
