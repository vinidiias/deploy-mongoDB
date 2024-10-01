const Task = require('../Models/Task')

module.exports = {
    async create(req,res) {

        const { name, importance, importance_id} = req.body

        try {
            const taskAlreadyExists = await Task.findOne({ name })
            if(taskAlreadyExists) return res.status(400).send({ message: 'Task already exists' })

            const createdTask = await Task.create({
                name,
                importance,
                importance_id,
            })

            return res.status(201).send(createdTask)
        }catch(err) {
            return res.status(400).send(err)
        }
    },

    async delete(req, res) {
        const { id } = req.params

        try{
            const deletedTask = await Task.findByIdAndDelete(id)

            return res.status(200).send({status: 'deleted', user: deletedTask })
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async list(req, res) {
        try{
            const allTasks = await Task.find()

            return res.status(200).send(allTasks)
        }catch(err) {
            return res.status(400).send(err)
        }
    }
}