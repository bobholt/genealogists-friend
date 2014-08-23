'use strict';

// Dependencies
var Researcher = require('../models/researcher');
var passport = require('passport');

var page = 'login';

module.exports = {
  renderPage: function(req, res) {
    req.logout();
    res.redirect('/');
  }
}
