'use strict';

// Dependencies
var controller = require('../controllers/register');

var basePath = '/register';

// Routes
module.exports = function(app) {

  app.post(basePath, controller.register);

};
