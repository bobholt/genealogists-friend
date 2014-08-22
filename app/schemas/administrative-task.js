// ADMINISTRATIVE-TASK
//   Type:
//     Dependent.  Requires ACTIVITY because it is a sub-entity.
//   Definition:
//     A sub-entity of ACTIVITY that holds information related to various
//     administrative chores other than conducting a genealogical SEARCH.
//     Currently this is a rather bland entity, and mostly serves to indicate
//     that an ACTIVITY is not a SEARCH and thus does not have the additional
//     attributes required of a genealogical SEARCH.
//   Primary Key:
//     See Activity-ID.
//   Foreign Keys:
//     Activity-ID (both a primary key and a foreign key) because
//     ADMINISTRATIVE-TASK is a subtype of ACTIVITY.
//   Relationships:
//     An ADMINISTRATIVE-TASK is a sub-entity of ACTIVITY.
//     Each ACTIVITY has either an ADMINISTRATIVE-TASK or a SEARCH.
//
// The RESEARCH-OBJECTIVEs are linked to specific ACTIVITYs such as a SEARCH or
// an ADMIN-TASK, planned or already executed.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('administrative-task').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('administrative-task', function(table) {

      // The unique key in ACTIVITY that identifies this ADMINISTRATIVE-TASK.
      table.integer('activity_id').unsigned().references('id').inTable('activity').notNullable().primary().unique();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
