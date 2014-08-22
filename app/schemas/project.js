// PROJECT
//   Type:
//     Independent.  Does not depend on any other entities.
//   Definition:
//     Information about the genealogical research project.  One project might
//     consist of all information about a person’s ancestors, both on the
//     researcher’s father’s side, and on the researcher’s mother’s side.
//     Another project is all the ancestors on only one side of the researcher’s
//     family, such as the mother’s side; this researcher might have another
//     project for the father’s side.  Another project is a one-name study.
//     Other types of genealogical projects include a study of the descendants
//     of a particular person or couple, and the descendants of a particular
//     group of people.  Finally, a project can be undertaken for another person,
//     in which case there is a client associated with the project.  Note that
//     client data is shown as an undefined attribute on the model, but would
//     actually be a model extension for professional genealogists.
//   Primary Key:
//     Project-ID
//   Foreign Keys:
//     None
//   Relationships:
//     One PROJECT is worked on by one to many RESEARCHERs (through RESEARCHER-PROJECT).
//     One PROJECT has zero to many RESEARCH-OBJECTIVEs.
//     One PROJECT relies on zero or one SURETY-SCHEME.
//     One SURETY-SCHEME can be used for zero to many PROJECTs.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('project').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('project', function(table) {

      // Unique identifier for the particular project.
      table.increments('id').primary().unique();

      // The name of the project, such as “John F. Kennedy Ancestors”, or
      // “Mayflower Descendants”.
      table.string('name').notNullable().defaultTo('');

      // A text description of the project that provides additional
      // information about the scope of the project, or any other necessary
      // supporting information.
      table.text('description').notNullable().defaultTo('');

      // If the project is undertaken for a client, the client name and
      // address is included.  An actual implementation for commercial
      // genealogical purposes might have one or more separate entities for
      // client information so that, for example, one client could commission
      // one or more projects.  Other information such as billing rates,
      // expense logs, hour logs, and invoicing could be part of that system,
      // but is not included in this basic genealogical data model.
      table.text('client_data').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
