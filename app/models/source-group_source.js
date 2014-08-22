'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;

var SourceGroup_Source = bookshelf.Model.extend({

  tableName: 'source-group_source',

  hasTimestamps: true
});

module.exports = bookshelf.model('SourceGroup_Source', SourceGroup_Source);
