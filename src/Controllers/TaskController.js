const Task = require('../Models/Task')

module.exports = {
    async create(req,res) {

        const { name, importance, importance_id } = req.body
        const { user_id } = req.params
        const { auth } = req.headers

        if(user_id !== auth) return res.status(400).send({ message: 'Unauthorized'})

        try{
            const createdTask = await Task.create({
                name,
                importance,
                importance_id,
                user: user_id,
            })

            await createdTask.populate('user')

            return res.status(201).send(createdTask)
        }catch(err){
            console.log(err)

            return res.status(400).send(err)
        }
    },

    async delete(req, res) {
        const { task_id, user_id } = req.params
        const { auth } = req.headers
        
        if(user_id !== auth) return res.status(400).send({ message: 'Unauthorized'})

        try{
            const deletedTask = await Task.findByIdAndDelete(task_id)

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
    },
    
    async listByUser(req, res) {
        const { user_id } = req.params
        const { auth } = req.headers

        if(user_id !== auth) return res.status(400).send({ message: 'Unauthorized'})
            
        try{
            const allTasksOfAUser = await Task.find({ user: user_id })

            return  res.status(200).send(allTasksOfAUser)
        }catch(err){
            return res.status(400).send(err)
        }
    }
}