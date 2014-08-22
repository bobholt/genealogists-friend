'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./assertion');
require('./citation-part');
require('./place');
require('./repository');
require('./repository_source');
require('./representation');
require('./researcher');
require('./source-group');

var Source = bookshelf.Model.extend({

  tableName: 'source',

  hasTimestamps: true,

  assertions: function() {
    return this.hasMany(Assertion);
  },

  citationParts: function() {
    return this.hasMany(CitationPart);
  },

  higherSource: function() {
    return this.belongsTo(this);
  },

  jurisdictionPlace: function() {
    return this.belongsTo(Place);
  },

  subjectPlace: function() {
    return this.belongsTo(Place);
  },

  repositories: function() {
    return this.belongsToMany(Repository).through(Repository_Source);
  },

  representations: function() {
    return this.hasMany(Representation);
  },

  researcher: function() {
    return this.belongsTo(Researcher);
  },

  sourceGroup: function() {
    return this.belongsToMany(SourceGroup, 'source-group_source');
  }
});

module.exports = bookshelf.model('Source', Source);
