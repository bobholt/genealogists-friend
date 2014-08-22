'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./activity');
require('./repository');
require('./repository_source');
require('./source');

var Search = bookshelf.Model.extend({

  tableName: 'search',

  hasTimestamps: true,

  activity: function() {
    return this.morphOne(Activity, 'activity')
  },

  repositories: function() {
    return this.belongsToMany(Repository).through(Repository_Source);
  },

  sources: function() {
    return this.belongsToMany(Source).through(Repository_Source);
  }
});

module.exports = bookshelf.model('Search', Search);
