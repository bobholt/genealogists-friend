// EVENT-TYPE
//   Type:
//     Independent.  Does not require any other entities.
//   Definition:
//     Because many events (e.g., marriages) have quite similar structures, it’s
//     more efficient to define a type of event in a template structure than to
//     keep defining individual events that are the same.  The EVENT-TYPE
//     contains the name of a standard event while the details about the usual
//     roles played in such an event appear as individual instances of
//     EVENT-TYPE-ROLE.
//   Primary Key:
//     Event-Type-ID
//   Foreign Keys:
//     None
//   Relationships:
//     One EVENT-TYPE is manifested as zero to many EVENTs.
//     One EVENT is of one and only one EVENT-TYPE.
//     One EVENT-TYPE has one to many EVENT-TYPE-ROLEs.
//     One EVENT-TYPE-ROLE belongs to one and only one EVENT-TYPE.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('event-type').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('event-type', function(table) {

      // Unique key that identifies a specific event type.
      table.increments('id').primary().unique();

      // The name of this event type.  An example might be “Marriage” or
      // “Wedding”, or “Battle”.
      table.string('name').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
