'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./project');
require('./surety-scheme-part');

var SuretyScheme = bookshelf.Model.extend({

  tableName: 'surety-scheme',

  hasTimestamps: true,

  projects: function() {
    return this.hasMany('Project');
  },

  suretySchemeParts: function() {
    return this.hasMany('SuretySchemePart');
  }
});

module.exports = bookshelf.model('SuretyScheme', SuretyScheme);
