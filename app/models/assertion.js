'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./assertion_assertion');
require('./characteristic');
require('./event');
require('./event-type-role');
require('./group-type-role');
require('./persona');
require('./place');
require('./researcher');
require('./source');
require('./surety-scheme-part');

var Assertion = bookshelf.Model.extend({

  tableName: 'assertion',

  hasTimestamps: true,

  higherLevelAssertions: function() {
    return this.belongsToMany(this).through('Assertion_Assertion');
  },

  lowerLevelAssertions: function() {
    return this.belongsToMany(this).through('Assertion_Assertion');
  },

  place: function() {
    return this.belongsTo('Place');
  },

  researcher: function() {
    return this.belongsTo('Researcher');
  },

  source: function() {
    return this.belongsTo('Source');
  },

  subject1: function() {
    return this.morphTo('subject_1', 'Characteristic', 'Event', 'Group', 'Persona')
  },

  subject2: function() {
    return this.morphTo('subject_2', 'Characteristic', 'Event', 'Group', 'Persona')
  },

  suretySchemePart: function() {
    return this.belongsTo('SuretySchemePart');
  },

  value: function() {
    return this.morphTo('value', 'EventTypeRole', 'GroupTypeRole');
  }
});

module.exports = bookshelf.model('Assertion', Assertion);
