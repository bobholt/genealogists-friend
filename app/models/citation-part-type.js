'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./citation-part');

var CitationPartType = bookshelf.Model.extend({

  tableName: 'citation-part-type',

  hasTimestamps: true,

  citationParts: function() {
    return this.hasMany('CitationPart');
  }
});

module.exports = bookshelf.model('CitationPartType', CitationPartType);
