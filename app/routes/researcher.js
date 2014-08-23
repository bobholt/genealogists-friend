'use strict';

// Dependencies
var controller = require('../controllers/researcher');

var basePath = '/researcher';

// Routes
module.exports = function(app) {

  app.get(basePath + '/dashboard', controller.renderPage);
  app.get(basePath + '/projects', controller.renderPage);
  app.get(basePath + '/profile', controller.renderPage);

};
