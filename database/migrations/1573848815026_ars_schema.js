'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArsSchema extends Schema {
  up () {
    this.create('ars', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('ars')
  }
}

module.exports = ArsSchema
