'use strict';

// Dependencies
var bookshelf = require('bookshelf').bookshelf;

var Researcher_Project = bookshelf.Model.extend({

  tableName: 'researcher_project',

  hasTimestamps: true
});

module.exports = bookshelf.model('Researcher_Project', Researcher_Project);
