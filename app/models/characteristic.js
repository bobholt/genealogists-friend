'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./assertion');
require('./characteristic-part');
require('./place');

var Characteristic = bookshelf.Model.extend({

  tableName: 'characteristic',

  hasTimestamps: true,

  characteristicParts: function() {
    return this.hasMany('CharacteristicPart');
  },

  place: function() {
    return this.belongsTo('Place');
  },

  assertionSubject1: function() {
    return this.morphOne('Assertion', 'subject_1');
  },

  assertionSubject2: function() {
    return this.morphOne('Assertion', 'subject_2');
  }
});

module.exports = bookshelf.model('Characteristic', Characteristic);
