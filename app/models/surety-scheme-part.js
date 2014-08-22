'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./assertion');
require('./surety-scheme');

var SuretySchemePart = bookshelf.Model.extend({

  tableName: 'surety-scheme-part',

  hasTimestamps: true,

  suretyScheme: function() {
    return this.belongsTo('SuretyScheme');
  },

  assertions: function() {
    return this.hasMany('Assertion');
  }
});

module.exports = bookshelf.model('SuretySchemePart', SuretySchemePart);
