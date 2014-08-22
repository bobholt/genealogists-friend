'use strict';


// Dependencies
var bookshelf = require('bookshelf').bookshelf;
require('./activity');

var AdministrativeTask = bookshelf.Model.extend({

  tableName: 'administrative-task',

  hasTimestamps: true,

  activity: function() {
    return this.morphOne('Activity', 'activity')
  }
});

module.exports = bookshelf.model('AdministrativeTask', AdministrativeTask);

