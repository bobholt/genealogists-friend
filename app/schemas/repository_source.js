// REPOSITORY-SOURCE
//   Type:
//     Dependent.  Requires SEARCH, REPOSITORY, and SOURCE.
//   Definition:
//     An associative entity that ties together REPOSITORY and SOURCE in a many
//     to many relationship.  Each instance in this entity represents a
//     particular SOURCE in a specific REPOSITORY.
//   Primary Key:
//     None
//   Foreign Keys:
//     Repository-ID (in REPOSITORY)
//     Source-ID (in SOURCE)
//     Activity-ID (in SEARCH)
//   Relationships:
//     One REPOSITORY-SOURCE describes either one SOURCE or one REPOSITORY or
//     one of each.
//     One SEARCH is conducted in zero to one REPOSITORYs (through
//     REPOSITORY-SOURCE).
//     One REPOSITORY is the scene of zero to many SEARCHs (through
//     REPOSITORY-SOURCE).
//     One SEARCH is conducted in zero to one SOURCEs (through
//     REPOSITORY-SOURCE).
//     One SOURCE provides data for zero to many SEARCHs (through
//     REPOSITORY-SOURCE).
//     One SOURCE is found in zero to many REPOSITORYs (through
//     REPOSITORY-SOURCE).
//     One REPOSITORY has zero to many SOURCEs (through REPOSITORY-SOURCE) that
//     can be searched.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('repository_source').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('repository_source', function(table) {

      // Unique key that identifies a specific REPOSITORY.
      table.integer('repository_id').unsigned().references('id').inTable('repository');

      // Unique key that identifies a specific SOURCE.
      table.integer('source_id').unsigned().references('id').inTable('source');

      // Unique key that identifies a specific SEARCH.
      table.integer('activity_id').unsigned().references('id').inTable('activity').notNullable();

      // The unique call number for a particular SOURCE in a particular
      // REPOSITORY.  Some REPOSITORYs use the same call number for the same
      // SOURCE such as a federal censuses, but most materials have different
      // call numbers.  In some cases, there are multiple copies of a SOURCE in
      // a REPOSITORY, and the researcher may wish to record which copy was the
      // object of the SEARCH, particularly if the copy was not in good
      // condition, and thus if the researcher wishes to SEARCH another copy.
      table.string('call_number').notNullable().defaultTo('');

      // Any pertinent notes about the particular SOURCE in the REPOSITORY, such
      // as notes describing the condition of the copy represented by the
      // particular call number.
      table.text('description').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
