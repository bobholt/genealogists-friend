'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./assertion');
require('./group-type');

var GroupTypeRole = bookshelf.Model.extend({

  tableName: 'group-type-role',

  hasTimestamps: true,

  assertionValues: function() {
    return this.morphMany(Assertion, 'value');
  },

  groupType: function() {
    return this.belongsTo(GroupType);
  }
});

module.exports = bookshelf.model('GroupTypeRole', GroupTypeRole);
