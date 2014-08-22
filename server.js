'use strict';

// Dependencies
var init = require('./config/init');
var config = require('./config/config');

var Knex = require('knex');
var knex = Knex.knex = Knex(config.database);
var Bookshelf = require('bookshelf');
var bookshelf = Bookshelf.bookshelf = Bookshelf(knex);

bookshelf.plugin('registry');

var app = require('./config/express')();

require('./config/passport')();

// Start the app by listening on the configured port
app.listen(config.port, null, null, function() {

  // Say it
  console.log('Express app started on port ' + config.port);
});

// Expose app
exports = module.exports = app;
