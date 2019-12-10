'use strict'

const Dossie = use('App/Models/DossieFile')
const Helpers = use('Helpers')
require('dotenv/config')


class DossieFileController {

  async index({ auth }) {

    const dossies = await Dossie.query().where('user_id', auth.user.id).fetch()
    return dossies
  }

  async uploadDossie({ request, auth, response }) {

    const dossieFile = request.file('dossie', {
      size: '10mb'
    })

    //const path = process.env.DOSSIE_PATH + `${auth.user.ar}/${auth.user.cpf}`
    const path = Helpers.publicPath(`${auth.user.ar}/${auth.user.cpf}`)

    const data = request.only(['dossieName', 'consulta_cpf',
      'consulta_cnpj', 'consulta_cei', 'consulta_docto', 'contrato', 'certidao', 'titulo', 'tipo_dossie'])

    await dossieFile.move(path, {
      name: `${Date.now()}-${dossieFile.clientName}`,
    })

    if (!dossieFile.moved()) {
      return dossieFile.error()
    }


    const dossie = await Dossie.create({ user_id: auth.user.id, dossiePath: dossieFile.fileName, ...data })
    console.log(dossie);

    return response.status(200).send('Upload realizado com sucesso.')
  }

  async create({ request, auth }) {

  }

  /**
   * Create/save a new dossiefile.
   * POST dossiefiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only(['dossieName', 'dossiePath', 'consulta_cpf',
      'consulta_cnpj', 'consulta_cei', 'consulta_docto', 'contrato', 'certidao', 'titulo', 'tipo_dossie'])
    const dossie = await Dossie.create({ user_id: auth.user.id, ...data })
    return dossie
  }

  /**
   * Display a single dossiefile.
   * GET dossiefiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async downloadDossie({ auth, response, request }) {
    
    const dossie = request.only(['dossiePath'])
    console.log(dossie.dossiePath);
    
    const download = await response.attachment(Helpers.publicPath(`${auth.user.ar}/${auth.user.cpf}/${dossie.dossiePath}`))
    //return download

   
  }

  /**
   * Render a form to update an existing dossiefile.
   * GET dossiefiles/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update dossiefile details.
   * PUT or PATCH dossiefiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a dossiefile with id.
   * DELETE dossiefiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = DossieFileController
