// ACTIVITY
//   Type:
//     Dependent.
//     Requires RESEARCH-OBJECTIVE through RESEARCH-OBJECTIVE-ACTIVITY.
//   Definition:
//     Contains information about an activity such as a SEARCH or an
//     ADMINISTRATIVE-TASK that must be, or was, accomplished.  ACTIVITY allows
//     the researcher to translate RESEARCH-OBJECTIVEs into specific action
//     items.  Note that ACTIVITY has two sub-entities:  ADMINISTRATIVE-TASK
//     and SEARCH.  It contains the attributes that are common to both
//     sub-entities.
//   Primary Key:
//     Activity-ID
//   Foreign Keys:
//     (None)
//   Relationships:
//     One ACTIVITY is the result of zero to many RESEARCH-OBJECTIVEs (through
//       RESEARCH-OBJECTIVE-ACTIVITY).  The zero condition addresses random or
//       spontaneous activities that are not part of a pre-planned
//       RESEARCH-OBJECTIVE.
//     One RESEARCH-OBJECTIVE results in zero to many ACTIVITYs.
//     One RESEARCHER undertakes zero to many ACTIVITYs.
//     One ACTIVITY is performed by one RESEARCHER.
//     One ACTIVITY is about either an ADMINSTRATIVE-TASK or a SEARCH.
//     An ADMINSTRATIVE-TASK is a type of ACTIVITY.
//     A SEARCH is a type of ACTIVITY.
//
// The RESEARCH-OBJECTIVEs are linked to specific ACTIVITYs such as a SEARCH or
// an ADMIN-TASK, planned or already executed.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('activity').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('activity', function(table) {

      // The unique key in ACTIVITY that identifies this ACTIVITY.
      table.increments('id').primary().unique();

      // The unique key in RESEARCHER that identifies the person who either did
      // or will do this ACTIVITY.
      table.integer('researcher_id').unsigned().references('id').inTable('researcher').notNullable();

      // The date that the researcher plans to conduct this ACTIVITY.
      table.datetime('scheduled_date').notNullable();

      // The date that the researcher completed this ACTIVITY.  If this is
      // blank, then the ACTIVITY has not been completed.
      table.datetime('completed_date').nullable();

      // This indicates whether the ACTIVITY is an ADMINISTRATIVE-TASK or a
      // SEARCH.
      table.string('activity_type').notNullable().defaultTo('');

      table.integer('activity_id').unsigned().notNullable();

      // This describes the status of the ACTIVITY.  Besides the obvious
      // category of “Completed” which is redundant with Completed-Date having a
      // value, other status indicators might be “waiting”, “on hold”, or some
      // other value.
      table.string('status').notNullable().defaultTo('not started');

      // A short description of the ACTIVITY.
      table.text('description').notNullable().defaultTo('');

      // A code indicating the priority the researcher sets on this activity.
      table.string('priority').notNullable().defaultTo('');

      // Any comments that are required about this ACTIVITY.
      table.text('comments').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});



