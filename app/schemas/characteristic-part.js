// CHARACTERISTIC-PART
//   Type:
//     Dependant.  Requires CHARACTERISTIC and CHARACTERISTIC-PART-TYPE.
//   Definition:
//     Most CHARACTERISTICs have a single CHARACTERISTIC-PART.  For example,
//     the characteristic “Occupation” typically has a single value.  But since
//     the data model defines a person’s name as another characteristic, and
//     since name is made up of parts such as given name, surname, suffix, and
//     so forth, this entity is required to collect the parts of a
//     CHARACTERISTIC.
//   Primary Key:
//     Characteristic-Part-ID
//   Foreign Keys:
//     Characteristic-ID
//     Characteristic-Part-Type-ID
//   Relationships:
//     One CHARACTERISTIC-PART is part of one CHARACTERISTIC.
//     One CHARACTERISTIC has one to many CHARACTERISTIC-PARTs.
//     One CHARACTERISTIC-PART is of one CHARACTERISTIC-PART-TYPE.
//     One CHARACTERISTIC-PART-TYPE is seen in zero to many CHARACTERISTIC-PARTs.
//     For example, the Characteristic-Part-Type-Name “Mononame” (in
//     CHARACTERISTIC-PART-TYPE) is seen in the Characteristic-Part-Name
//     “Sitting Bull”, “Geronimo”, and “Blue Duck” (in CHARACTERISTIC-PART).

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('characteristic-part').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('characteristic-part', function(table) {

      // Unique key that identifies a specific characteristic part.
      table.increments('id').primary().unique();

      // Unique key that identifies the characteristic.
      table.integer('characteristic_id').unsigned().references('id').inTable('characteristic').notNullable();

      // Unique key that identifies a specific characteristic part type.
      table.integer('characteristic_part_type_id').unsigned().references('id').inTable('characteristic-part-type').notNullable();

      // The actual name of the characteristic part, such as “Stagecoach driver”,
      // “Red”, or “Mary.
      table.string('name').notNullable().defaultTo('');

      // The number that keeps the characteristic parts sorted in correct order.
      table.integer('sequence_number').unsigned().notNullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});

