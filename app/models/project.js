'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./research-objective');
require('./researcher');
require('./researcher_project');
require('./surety-scheme');

var Project = bookshelf.Model.extend({

  tableName: 'project',

  hasTimestamps: true,

  researchObjectives: function() {
    return this.hasMany('ResearchObjective');
  },

  researchers: function() {
    return this.belongsToMany('Researcher').through('Researcher_Project');
  },

  suretyScheme: function() {
    return this.belongsTo('SuretyScheme');
  }
});

module.exports = bookshelf.model('Project', Project);
