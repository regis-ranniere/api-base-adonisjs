'use strict'

const Mail = use('Mail')
const { test, trait } = use('Test/Suite')('Forgot Credentials')

/** @type {import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @type {import ('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('it should send an email with forget password instrunctions', async ({
  assert,
  client
}) => {
  Mail.fake()
  const forgotPayload = {
    email: 'regis.ranniere@gmail.com'
  }

  await Factory.model('App/Models/User').create(forgotPayload)

  const response = await client
    .post('/user/forgot/pass')
    .send(forgotPayload)
    .end()

  response.assertStatus(204)

  const recentEmail = Mail.pullRecent()

  assert.equal(recentEmail.message.to[0].address, 'regis.ranniere@gmail.com')

  Mail.restore()
})

test('it should return a error code when not find e-mail user', async ({
  assert,
  client
}) => {
  const forgotPayload = {
    email: 'emailNotFound@nada.com'
  }

  const response = await client
    .post('/user/forgot/pass')
    .send(forgotPayload)
    .end()

  response.assertStatus(404)
})
