'use strict';

// Dependencies
var Router = require('../helpers/_base-router');
var indexController = require('../controllers/index');

var router = new Router({
  controller: indexController,
  basePath: '/',
  api: false,
  server: true
});

// Routes
module.exports = router.setRoutes;
