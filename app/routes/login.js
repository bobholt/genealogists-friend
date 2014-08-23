'use strict';

// Dependencies
var controller = require('../controllers/login');

var basePath = '/login';

// Routes
module.exports = function(app) {

  app.get(basePath, controller.renderPage);

  app.post(basePath, controller.authenticate);

};
