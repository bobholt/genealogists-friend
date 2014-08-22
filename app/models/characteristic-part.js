'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./characteristic');
require('./characteristic-part-type');

var CharacteristicPart = bookshelf.Model.extend({

  tableName: 'characteristic-part',

  hasTimestamps: true,

  characteristic: function() {
    return this.belongsTo('Characteristic');
  },

  characteristicPartType: function() {
    return this.belongsTo('CharacteristicPartType');
  }
});

module.exports = bookshelf.model('CharacteristicPart', CharacteristicPart);
