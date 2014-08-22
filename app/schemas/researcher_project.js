// RESEARCHER-PROJECT
//   Type:
//     Dependent.  Requires RESEARCHER and PROJECT.
//   Definition:
//     Associative entity that ties together RESEARCHER and PROJECT so that one
//     RESEARCHER can work on zero to many PROJECTs and one PROJECT can have one
//     to many RESEARCHERs.
//   Primary Key:
//     None
//   Foreign Keys:
//     Researcher-ID (in RESEARCHER)
//     Project-ID (in PROJECT)
//   Relationships:
//     One RESEARCHER-PROJECT describes one PROJECT.
//     One PROJECT has one to many RESEARCHER-PROJECTs.
//     One RESEARCHER-PROJECT is worked on by one RESEARCHER.
//     One RESEARCHER works on zero to many RESEARCHER-PROJECTs.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('researcher_project').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('researcher_project', function(table) {

      // Unique identifier for this particular RESEARCHER_PROJECT.
      table.increments('id').primary().unique();

      // Unique key that indicates which RESEARCHER.
      table.integer('researcher_id').unsigned().references('id').inTable('researcher').notNullable();

      // Unique key that indicates which PROJECT.
      table.integer('project_id').unsigned().references('id').inTable('project').notNullable();

      // If it is necessary to describe the role that a particular RESEARCHER
      // played, this field can differentiate different people on a group
      // effort.
      table.string('role').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
