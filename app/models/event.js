'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./assertion');
require('./event-type');
require('./place');

var Event = bookshelf.Model.extend({

  tableName: 'event',

  hasTimestamps: true,

  eventType: function() {
    return this.belongsTo('EventType');
  },

  place: function() {
    return this.belongsTo('Place');
  },

  assertionSubject1: function() {
    return this.morphOne('Assertion', 'subject_1');
  },

  assertionSubject2: function() {
    return this.morphOne('Assertion', 'subject_2');
  }
});

module.exports = bookshelf.model('Event', Event);
