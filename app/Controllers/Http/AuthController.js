'use strict'
const mkdirp = require('mkdirp');
require('dotenv/config');

const User = use('App/Models/User')

class AuthController {
    async register({ request, response }) {

        try {
            const data = request.only(['username', 'email', 'password', 'cpf', 'ar'])
            data.active = false
            data.cpf = data.cpf.replace(/[^\d]+/g, '')
            console.log(data);

            const user = await User.create(data)
            /* mkdirp(`${process.env.DOSSIE_PATH}/${data.ar}/${data.username}`, function (err) {
                if (err) console.error(err)
                else console.log('pow!')
            }) */
            return user
        } catch (err) {

            return response.send(err)
        }

    }

    async authenticate({ request, auth, response }) {
        const { cpf, password } = request.all()
        cpf.replace(/[^\d]+/g, '')
        const token = await auth.attempt(cpf, password)
        console.log(response);

        return token
    }

    async getUserData({ response, auth }) {
        try {
            return await auth.getUser()
        } catch (error) {
            response.send('Você não está logado!')
        }
    }
}

module.exports = AuthController
