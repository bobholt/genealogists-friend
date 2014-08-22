'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;

var Repository_Source = bookshelf.Model.extend({

  tableName: 'repository_source',

  hasTimestamps: true

});

module.exports = bookshelf.model('Repository_Source', Repository_Source);
