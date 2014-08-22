'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./place');
require('./repository_source');
require('./source');

var Repository = bookshelf.Model.extend({

  tableName: 'repository',

  hasTimestamps: true,

  place: function() {
    return this.belongsTo('Place');
  },

  sources: function() {
    return this.belongsToMany('Source').through('Repository_Source');
  }
});

module.exports = bookshelf.model('Repository', Repository);
