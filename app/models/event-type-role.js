'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./assertion');
require('./event-type');

var EventTypeRole = bookshelf.Model.extend({

  tableName: 'event-type-role',

  hasTimestamps: true,

  assertionValues: function() {
    return this.morphMany('Assertion', 'value');
  },

  eventType: function() {
    return this.belongsTo('EventType');
  }
});

module.exports = bookshelf.model('EventTypeRole', EventTypeRole);
