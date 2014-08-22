'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./place');
require('./place-part-type');

var PlacePart = bookshelf.Model.extend({

  tableName: 'place-part',

  hasTimestamps: true,

  place: function() {
    return this.belongsTo('Place');
  },

  placePartType: function() {
    return this.belongsTo('PlacePartType');
  }
});

module.exports = bookshelf.model('PlacePart', PlacePart);
