'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./administrative-task');
require('./research-objective');
require('./researcher');
require('./search');

var Activity = bookshelf.Model.extend({

  tableName: 'activity',

  hasTimestamps: true,

  researchObjectives: function() {
    return this.belongsToMany('ResearchObjective', 'research-objective_activity');
  },

  researcher: function() {
    return this.belongsTo('Researcher');
  },

  activityType: function() {
    return this.morphTo('activity', 'AdministrativeTask', 'Search')
  }
});

module.exports = bookshelf.model('Activity', Activity);
