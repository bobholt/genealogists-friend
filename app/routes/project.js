'use strict';

// Dependencies
var controller = require('../controllers/project');

var basePath = '/projects';

// Routes
module.exports = function(app) {

  app.get(basePath, controller.renderPage);

};
