'use strict';

// Dependencies
var controller = require('../controllers/researcher');

var basePath = '/researcher';

// Routes
module.exports = function(app) {

  app.get(basePath + '/:id', controller.renderPage);

};
