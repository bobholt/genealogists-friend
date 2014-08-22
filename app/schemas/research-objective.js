// RESEARCH-OBJECTIVE
//   Type:
//     Dependent.  Requires PROJECT.
//   Definition:
//     Contains information about the RESEARCH-OBJECTIVEs that the RESEARCHER
//     has determined are appropriate for the specific PROJECT.  For example,
//     one objective might be to “Find the father of John Smith.”
//   Primary Key:
//     Research-Objective-ID
//   Foreign Keys:
//     Project-ID (in PROJECT)
//   Relationships:
//     One PROJECT has zero to many RESEARCH-OBJECTIVEs.
//     One RESEARCH-OBJECTIVE applies to one PROJECT.
//     One RESEARCH-OBJECTIVE results in zero to many ACTIVITYs (through
//     RESEARCH-OBJECTIVE-ACTIVITY).
//     One ACTIVITY is associated with zero to many RESEARCH-OBJECTIVEs (through
//     RESEARCH-OBJECTIVE-ACTIVITY).

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('research-objective').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('research-objective', function(table) {

      // Unique key that identifies the specific RESEARCH-OBJECTIVE.
      table.increments('id').primary().unique();

      // Unique key that identifies the PROJECT that this RESEARCH-OBJECTIVE
      // belongs to.
      table.integer('project_id').unsigned().references('id').inTable('project').notNullable();

      // The name of the RESEARCH-OBJECTIVE.
      table.string('name').notNullable().defaultTo('');

      // A more detailed description of the RESEARCH-OBJECTIVE.
      table.text('description').notNullable().defaultTo('');

      // A value that keeps the RESEARCH-OBJECTIVEs sorted in any order that the
      // RESEARCHER wants.
      table.integer('sequence_number').unsigned().notNullable();

      // The priority assigned to this RESEARCH-OBJECTIVE by the RESEARCHER.
      table.string('priority').notNullable().defaultTo('');

      // The status of this RESEARCH-OBJECTIVE such as “Open” or “Closed”.
      table.string('status').notNullable().defaultTo('open');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
