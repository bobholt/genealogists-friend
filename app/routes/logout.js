'use strict';

// Dependencies
var controller = require('../controllers/logout');

var basePath = '/logout';

// Routes
module.exports = function(app) {

  app.get(basePath, controller.renderPage);

};
