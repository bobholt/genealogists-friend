'use strict';

// Dependencies
var Router = require('../helpers/_base-router');
var loginController = require('../controllers/login');

console.log(loginController);

var router = new Router({
  controller: loginController,
  basePath: '/login',
  api: false,
  server: true
});

// Routes
module.exports = router.setRoutes;
