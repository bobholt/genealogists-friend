'use strict';

// Dependencies
var controller = require('../controllers/index');

var basePath = '/';

// Routes
module.exports = function(app) {

  app.get(basePath, controller.renderPage);

};
