const Importance = require('../Models/Importance')
const importance = require('../Models/Importance')

module.exports = ({
    async create(req, res) {
        const { name, id } = req.body

        try {
            const importanceAlredyExists = await Importance.findOne({ name })
            if(importanceAlredyExists) return res.status(400).send({ message: 'Importance already exists'})

            const createdImportance = await Importance.create({
                name,
                id
            })
            return res.status(200).send(createdImportance)
        }catch (err) {
            return res.status(400).send(err)
        }
    },
    async list(req, res) {
        try{
            const AllImportances = await Importance.find()

            return res.status(200).send(AllImportances)
        }catch(err){
            res.status(400).send(err)
        }
    }
})