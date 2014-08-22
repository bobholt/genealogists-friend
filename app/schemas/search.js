// SEARCH
//   Type:
//     Dependent.  Requires SOURCE or REPOSITORY.  Also requires RESEARCHER.
//     Also a subtype of ACTIVITY (along with ADMINISTRATION-TASK) and thus
//     usually but not always requires a RESEARCH-OBJECTIVE as well.
//   Definition:
//     A specific examination of a SOURCE to find information, usually based on
//     a RESEARCH-OBJECTIVE, although a SEARCH can be conducted with no
//     RESEARCH-OBJECTIVE in mind, particularly where it is a casual search
//     based on an unplanned or unexpected opportunity.
//     The concept of SEARCH is heavily influenced by the need to record what
//     data the RESEARCHER looked for in a particular SOURCE on a particular
//     research trip, to avoid having to look up that data again.  A SEARCH can
//     return specific data, or a SEARCH can result in not finding the data
//     searched for, which is, of course, significant in itself.
//   Primary Key:
//     See Activity-ID (in ACTIVITY)
//   Foreign Keys:
//     Source-ID (in SOURCE)
//     Repository-ID (in REPOSITORY)
//   Relationships:
//     One SOURCE takes place in one REPOSITORY-SOURCE.
//     One SEARCH is conducted in zero to one REPOSITORYs (through
//     REPOSITORY-SOURCE).
//     One REPOSITORY is the scene of zero to many SEARCHs (through
//     REPOSITORY-SOURCE).
//     One SEARCH is conducted in zero to one SOURCEs (through
//     REPOSITORY-SOURCE).
//     One SOURCE provides data for zero to many SEARCHs (through
//     REPOSITORY-SOURCE).

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('search').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('search', function(table) {

      // Unique key that identifies a SEARCH as a subtype of an ACTIVITY.
      table.integer('activity_id').unsigned().references('id').inTable('activity').notNullable().primary().unique();

      // Unique key that identifies a SOURCE that this SEARCH took place in.  If the SEARCH was a general SEARCH in a REPOSITORY, for example to determine what suitable materials the REPOSITORY contains, this may be blank.
      table.integer('source_id').unsigned().references('id').inTable('source').notNullable();

      // Unique key that identifies a REPOSITORY.  This is a required attribute and cannot be blank.
      table.integer('repository_id').unsigned().references('id').inTable('repository').notNullable();

      // The text, such as a surname and certain variations, searched for.
      table.text('searched_for').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
