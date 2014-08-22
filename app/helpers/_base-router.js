'use strict';

var _ = require('lodash');

function Router(attributes) {
  console.log(attributes.controller);
  this.controller = attributes.controller;
  this.basePath = attributes.basePath;
  this.api = attributes.api;
  this.server = attributes.server;
  this.apiPath = '/api/v1' + this.basePath;
  this.renderPage = attributes.renderPage || this.basePath.substr(1);

  _.bindAll(this, 'setRoutes');
}

Router.prototype.setRoutes = function(app) {
  var self = this;

  if (this.server) {

    if (this.controller.renderPage) {
      app.get(this.basePath, this.controller.renderPage);
    }

    console.log(this.controller.post);

    if (this.controller.post) {
      app.post(this.basePath, this.controller);
    }
  }

  if (this.api) {
    // Create new Model
    app.post(this.apiPath, this.controller.create);

    // Get Collection of Models
    app.get(this.apiPath, this.controller.list );

    // Get Single Model
    app.get(this.apiPath + '/:id', this.controller.read );

    // Update Single Model
    app.put(this.apiPath + '/:id', this.controller.update);

    // Destroy Single Model
    app.delete(this.apiPath + '/:id', this.controller.destroy);
  }

};

module.exports = Router;
