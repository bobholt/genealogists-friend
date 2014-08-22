'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./representation-type');
require('./source');

var Representation = bookshelf.Model.extend({

  tableName: 'representation',

  hasTimestamps: true,

  representationType: function() {
    return this.belongsTo('RepresentationType');
  },

  source: function() {
    return this.belongsTo('Source');
  }
});

module.exports = bookshelf.model('Representation', Representation);
