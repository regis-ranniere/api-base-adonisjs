'use strict'

const { test, trait } = use('Test/Suite')('User Login');

/** @type {import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @type {import ('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')

test('it should return JWT Token when successfully authenticated',
async ({ assert, client }) => {
  const credentials = {
    email: 'regis.ranniere@gmail.com',
    password: '123456'
  };

  const user = await Factory.model('App/Models/User').create(credentials);

  const response = await client
  .post('/token')
  .send(credentials)
  .end()

  response.assertStatus(200);
  assert.exists(response.body.token);
});