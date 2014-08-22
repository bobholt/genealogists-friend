'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./assertion');
require('./characteristic');
require('./event');
require('./group');
require('./place-part');
require('./researcher');
require('./repository');
require('./source');

var Place = bookshelf.Model.extend({

  tableName: 'place',

  hasTimestamps: true,

  assertions: function() {
    return this.hasMany('Assertion');
  },

  characteristics: function() {
    return this.hasMany('Characteristic');
  },

  events: function() {
    return this.hasMany('Event');
  },

  groups: function() {
    return this.hasMany('Group');
  },

  placeParts: function() {
    return this.hasMany('PlacePart');
  },

  researchers: function() {
    return this.hasMany('Researcher');
  },

  repositories: function() {
    return this.hasMany('Repository');
  },

  sources: function() {
    return this.hasMany('Source');
  }
});

module.exports = bookshelf.model('Place', Place);
