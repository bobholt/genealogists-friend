'use strict';

// Dependencies
var controller = require('../controllers/dashboard');

var basePath = '/dashboard';

// Routes
module.exports = function(app) {

  app.get(basePath, controller.renderPage);

};
