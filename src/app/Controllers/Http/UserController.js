'use strict'

const Mail = use('Mail')

/** @type {import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

class UserController {
  async forgotpass({ request }) {
    const email = request.input('email')

    const user = await User.findByOrFail('email', email)

    await Mail.send('user.email.forgotpassword', user.toJSON(), (message) => {
      message
        .to(user.email)
        .from('<from-email>')
        .subject('Recuperacao de senha')
    })
  }
}

module.exports = UserController
