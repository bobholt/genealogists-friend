// SOURCE-GROUP-SOURCE
//   Type:
//     Dependent.  Requires SOURCE-GROUP and SOURCE.
//   Definition:
//     An associative entity that ties together SOURCE and SOURCE-GROUP in a
//     many to many relationship.
//   Primary Key:
//     None
//   Foreign Keys:
//     Source-ID (in SOURCE)
//     Source-Group-ID (in SOURCE-GROUP)
//   Relationships:
//     One SOURCE-GROUP has zero to many SOURCEs (through SOURCE-SOURCE-GROUP).
//     One SOURCE belongs to zero to many SOURCE-GROUPs (through
//     SOURCE-SOURCE-GROUP).


'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('source-group_source').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('source-group_source', function(table) {

      // Unique key that identifies the SOURCE.
      table.integer('source_id').unsigned().references('id').inTable('source').notNullable();

      // Unique key that identifies the SOURCE-GROUP.
      table.integer('source_group_id').unsigned().references('id').inTable('source_group').notNullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
