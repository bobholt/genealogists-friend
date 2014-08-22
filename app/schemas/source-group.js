// SOURCE-GROUP
//   Type:
//     Independent.  Does not require any other entities.
//   Definition:
//     Contains a list of groups of SOURCEs such as “Federal Census”, “Will”,
//     “Deed”, and so forth.  This is necessary in some cases so that data can
//     be searched, selected, sorted, and grouped by type of SOURCE; without an
//     explicit SOURCE-GROUP it may not be clear what type of record is
//     represented by the SOURCE, although in most cases the title is explicit
//     enough.  However, some researchers may wish to group SOURCEs of
//     particular interest such as “New England Sources”, “Massachusetts
//     Sources”, or “Boston Sources”.  Consequently, a SOURCE can be in more
//     than one group and in the examples above more than one group scheme.
//   Primary Key:
//     Source-Group-ID
//   Foreign Keys:
//     None
//   Relationships:
//     One SOURCE-GROUP represents the type of source for zero to many SOURCEs
//     (through SOURCE-SOURCE-GROUP).
//     One SOURCE belongs to zero to many SOURCE-GROUPs (through
//     SOURCE-SOURCE-GROUP).  (Although zero to one is the normal condition,
//     this allows the RESEARCHER to use multiple grouping concepts for the
//     same SOURCEs.)

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('source-group').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('source-group', function(table) {

      // Unique key that identifies the SOURCE-GROUP.
      table.increments('id').primary().unique();

      // The name of the SOURCE-GROUP such as “Will”, “Deed”, or “Tombstone”.
      table.string('name').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
