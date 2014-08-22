'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./assertion');

var Persona = bookshelf.Model.extend({

  tableName: 'persona',

  hasTimestamps: true,

  assertionSubject1: function() {
    return this.morphOne('Assertion', 'subject_1');
  },

  assertionSubject2: function() {
    return this.morphOne('Assertion', 'subject_2');
  }
});

module.exports = bookshelf.model('Persona', Persona);
