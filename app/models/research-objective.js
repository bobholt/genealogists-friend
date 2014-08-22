'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./project');

var ResearchObjective = bookshelf.Model.extend({

  tableName: 'research-objective',

  hasTimestamps: true,

  activities: function() {
    return this.belongsToMany('Activity', 'research-objective_activity');
  },

  project: function() {
    return this.belongsTo('Project');
  }
});

module.exports = bookshelf.model('ResearchObjective', ResearchObjective);
