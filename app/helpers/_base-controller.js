'use strict';

var _ = require('lodash');

function Controller(attributes) {
  this.model = attributes.model;
  this.name = attributes.name;
  _.bindAll(this, 'create', 'read', 'list', 'update', 'destroy');
}

Controller.prototype.renderPage = function(req, res) {
  console.log(req);
  res.render(this.name, {
    user: req.user || null
  });
};

Controller.prototype.create = function(req, res){};
Controller.prototype.read = function(req, res){
  new this.model({'id': req.params.id})
    .fetch()
    .then(function(model) {
      res.json(model.toJSON());
    });
};
Controller.prototype.list = function(req, res){
  this.model.fetchAll().then(function(collection) {
    res.json(collection.toJSON());
  });
};
Controller.prototype.update = function(req, res){};
Controller.prototype.destroy = function(req, res){};

module.exports = Controller;
