'use strict';

// Dependencies
var Router = require('../helpers/_base-router');
var registerController = require('../controllers/register');

var router = new Router({
  controller: registerController,
  basePath: '/register',
  api: false,
  server: true
});

// Routes
module.exports = router.setRoutes;
