'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./group');
require('./group-type-role');

var GroupType = bookshelf.Model.extend({

  tableName: 'group-type',

  hasTimestamps: true,

  groups: function() {
    return this.hasMany('Group');
  },

  groupTypeRoles: function() {
    return this.hasMany('GroupTypeRole');
  }
});

module.exports = bookshelf.model('GroupType', GroupType);
