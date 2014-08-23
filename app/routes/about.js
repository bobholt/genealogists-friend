'use strict';

// Dependencies
var controller = require('../controllers/about');

var basePath = '/about';

// Routes
module.exports = function(app) {

  app.get(basePath, controller.renderPage);

};
