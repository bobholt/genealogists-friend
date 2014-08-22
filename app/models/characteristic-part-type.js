'use strict';


// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./characteristic-part');

var CharacteristicPartType = bookshelf.Model.extend({

  tableName: 'characteristic-part-type',

  hasTimestamps: true,

  characteristicParts: function() {
    return this.hasMany('CharacteristicPart');
  }
});

module.exports = bookshelf.model('CharacteristicPartType', CharacteristicPartType);

