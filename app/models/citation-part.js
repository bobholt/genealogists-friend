'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./citation-part-type');
require('./source');

var CitationPart = bookshelf.Model.extend({

  tableName: 'citation-part',

  hasTimestamps: true,

  citationPartType: function() {
    return this.belongsTo(CitationPartType);
  },

  source: function() {
    return this.belongsTo(Source);
  }
});

module.exports = bookshelf.model('CitationPart', CitationPart);
