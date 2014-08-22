'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./place-part');

var PlacePartType = bookshelf.Model.extend({

  tableName: 'place-part-type',

  hasTimestamps: true,

  placeParts: function() {
    return this.hasMany('PlacePart');
  }
});

module.exports = bookshelf.model('PlacePartType', PlacePartType);
