const { Router } = require('express')

const TaskController = require('../Controllers/TaskController')
const ImportanceController = require('../Controllers/ImportanceController')

const routes = Router()

routes.post('/tasks', TaskController.create)
routes.get('/tasks', TaskController.list)
routes.delete('/tasks/:id', TaskController.delete)

routes.post('/importances', ImportanceController.create)
routes.get('/importances', ImportanceController.list)

module.exports = routes