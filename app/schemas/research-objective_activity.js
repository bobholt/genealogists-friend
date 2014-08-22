// RESEARCH-OBJECTIVE-ACTIVITY
//   Type:
//     Dependent.  Requires RESEARCH-OBJECTIVE and ACTIVITY.
//   Definition:
//     Associative entity that breaks up the many to many relationship between RESEARCH-OBJECTIVE and ACTIVITY.
//   Primary Key:
//     None
//   Foreign Keys:
//     Research-Objective-ID (in RESEARCH-OBJECTIVE)
//     Activity-ID (in ACTIVITY)
//   Relationships:
//     One RESEARCH-OBJECTIVE has zero to many RESEARCH-OBJECTIVE-ACTIVITYs.
//     One RESEARCH-OBJECTIVE-ACTIVITY supports one RESEARCH-OBJECTIVE.
//     One RESEARCH-OBJECTIVE-ACTIVITY results in one ACTIVITY.
//     One ACTIVITY is associated with zero to many RESEARCH-OBJECTIVE-ACTIVITYs.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('research-objective_activity').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('research-objective_activity', function(table) {

      // Unique key that identifies the specific RESEARCH-OBJECTIVE.
      table.integer('research_objective_id').unsigned().references('id').inTable('research-objective').notNullable();

      // Unique key that identifies the ACTIVITY that this RESEARCH-OBJECTIVE-ACTIVITY supports.
      table.integer('activity_id').unsigned().references('id').inTable('activity').notNullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
