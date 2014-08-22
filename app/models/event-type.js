'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./event');
require('./event-type-role');

var EventType = bookshelf.Model.extend({

  tableName: 'event-type',

  hasTimestamps: true,

  events: function() {
    return this.hasMany('Event');
  },

  eventTypeRoles: function() {
    return this.hasMany('EventTypeRole');
  }
});

module.exports = bookshelf.model('EventType', EventType);
