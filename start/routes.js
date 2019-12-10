'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const Database = use('Database')

Route.get('/app', async () => {
  return await Database.table('users').select('username')
})


Route.post('/register', 'AuthController.register')
Route.post('/upload', 'DossieFileController.uploadDossie').middleware('auth')
Route.post('/auth', 'AuthController.authenticate')
Route.get('/newuser', 'AuthController.getUserData')
Route.get('/getuser', 'AuthController.getUserData')
Route.get('/login', 'AppController.index').middleware('auth')
Route.get('/dossies', 'DossieFileController.index').middleware('auth')
Route.get('/user', 'DossieFileController.index').middleware('auth')
Route.get('/download', 'DossieFileController.downloadDossie').middleware('auth')

Route.group(()=>{
  Route.resource('dossies', 'DossieFileController').apiOnly()
}).middleware('auth')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
