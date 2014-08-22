'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./source');

var SourceGroup = bookshelf.Model.extend({

  tableName: 'source-group',

  hasTimestamps: true,

  sources: function() {
    return this.belongsToMany('Source', 'source-group_source');
  }
});

module.exports = bookshelf.model('SourceGroup', SourceGroup);
