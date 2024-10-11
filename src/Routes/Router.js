const { Router } = require('express')

const UserController = require('../Controllers/UserController')
const TaskController = require('../Controllers/TaskController')
const ImportanceController = require('../Controllers/ImportanceController')
const SessionController = require('../Controllers/SessionController')

const routes = Router()

routes.get('/user', UserController.index)
routes.post('/user', UserController.create)
routes.delete('/user/:user_id', UserController.delete)

routes.get('/tasks', TaskController.list)
routes.get('/tasks/:user_id', TaskController.listByUser)
routes.post('/:user_id/tasks', TaskController.create)
routes.delete('/:user_id/tasks/:task_id', TaskController.delete)

routes.get('/importances', ImportanceController.list)
routes.post('/importances', ImportanceController.create)

routes.post('/session', SessionController.create)

module.exports = routes