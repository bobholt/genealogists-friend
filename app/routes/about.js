'use strict';

// Dependencies
var Router = require('../helpers/_base-router');
var aboutController = require('../controllers/about');

var router = new Router({
  controller: aboutController,
  basePath: '/about',
  api: false,
  server: true
});

// Routes
module.exports = router.setRoutes;
