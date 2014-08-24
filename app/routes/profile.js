'use strict';

// Dependencies
var controller = require('../controllers/profile');

var basePath = '/profile';

// Routes
module.exports = function(app) {

  app.get(basePath, controller.renderPage);

  app.post(basePath, controller.updateProfile);

};
