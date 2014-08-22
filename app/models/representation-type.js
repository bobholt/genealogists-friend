'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
var Representation = require('./representation');

var RepresentationType = bookshelf.Model.extend({

  tableName: 'representation-type',

  hasTimestamps: true,

  representations: function() {
    return this.hasMany('Representation');
  }
});

module.exports = bookshelf.model('RepresentationType', RepresentationType);
