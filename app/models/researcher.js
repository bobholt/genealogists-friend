'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./activity');
require('./assertion');
require('./place');
require('./project');
require('./researcher_project');

var Researcher = bookshelf.Model.extend({

  tableName: 'researcher',

  hasTimestamps: true,

  activities: function() {
    return this.hasMany('Activity');
  },

  assertions: function() {
    return this.hasMany('Assertion');
  },

  place: function() {
    return this.belongsTo('Place');
  },

  projects: function() {
    return this.belongsToMany(Project).through('Researcher_Project');
  },
});

module.exports = bookshelf.model('Researcher', Researcher);
