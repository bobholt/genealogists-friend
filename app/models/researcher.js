'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
var bcrypt = require('bcrypt');

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

  authenticate: function(password) {
    return bcrypt.compareSync(password, this.get('password'));
  }
});

module.exports = bookshelf.model('Researcher', Researcher);
