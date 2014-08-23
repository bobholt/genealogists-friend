'use strict';

// Dependencies
var controller = require('../controllers/register');

var basePath = '/register';

// Routes
module.exports = function(app) {

  app.get(basePath, controller.renderPage);

  app.post(basePath, controller.register);

};
