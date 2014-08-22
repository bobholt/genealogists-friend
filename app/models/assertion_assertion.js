'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;

var Assertion_Assertion = bookshelf.Model.extend({

  tableName: 'assertion_assertion',

  hasTimestamps: true
});

module.exports = bookshelf.model('Assertion_Assertion', Assertion_Assertion)

