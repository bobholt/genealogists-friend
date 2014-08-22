// EVENT-TYPE-ROLE
//   Type:
//     Dependent.  Requires EVENT-TYPE.
//   Definition:
//     The individual roles of a defined event type, such as “Chaplain” for a
//     role in a military unit.
//   Primary Key:
//     Event-Type-Role-ID
//   Foreign Keys:
//     Event-Type-ID (in EVENT-TYPE)
//   Relationships:
//     Each EVENT-TYPE-ROLE belongs to only one EVENT TYPE.
//     An EVENT-TYPE can have zero to many EVENT-TYPE-ROLEs.  The zero condition
//     is for unity, where there is only one event type role in the event type,
//     meaning everyone in the event participated in the same capacity, such as
//     “Witness”.
//     An EVENT-TYPE-ROLE can appear in zero to many ASSERTIONs in the Value
//     attribute.
//     One ASSERTION is about zero or one EVENT-TYPE-ROLEs.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('event-type-role').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('event-type-role', function(table) {

      // Unique key that identifies each member of the EVENT-TYPE.
      table.increments('id').primary().unique();

      // Unique key that identifies the EVENT-TYPE to which these members belong.
      table.integer('event_type_id').unsigned().references('id').inTable('event-type').notNullable();

      // The value that distinguishes the different members of the event type, such as role (bride, groom, witness).
      table.string('name').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
