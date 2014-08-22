'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./assertion');
require('./group-type');
require('./place');

var Group = bookshelf.Model.extend({

  tableName: 'group',

  hasTimestamps: true,

  groupType: function() {
    return this.belongsTo('GroupType');
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

module.exports = bookshelf.model('Group', Group);
