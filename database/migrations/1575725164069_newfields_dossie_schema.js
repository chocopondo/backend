'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NewfieldsDossieSchema extends Schema {
  up () {
    this.table('dossie_files', (table) => {
      table.boolean('consulta_cpf').defaultTo(false)
      table.boolean('consulta_cnpj').defaultTo(false)
      table.boolean('consulta_cei').defaultTo(false)
      table.boolean('consulta_docto').defaultTo(false)
      table.boolean('contrato').defaultTo(false)
      table.boolean('certidao').defaultTo(false)
      table.boolean('titulo').defaultTo(false)
    })
  }

  down () {
    this.table('dossie_files', (table) => {
      // reverse alternations
    })
  }
}

module.exports = NewfieldsDossieSchema
