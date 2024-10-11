const { deleteModel } = require('mongoose')
const User = require('../Models/User')

const bcrypt = require('bcrypt')

async function hashPassword(password) {
    try{
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt)
        return encryptedPassword
    }catch(err){
        return err
    }
}

module.exports = {
    async create(req, res) {
        
        const { name, password} = req.body
       
        try{
            const userAlreadyExists = await User.findOne({ name})
            if(userAlreadyExists) return res.status(400).send({ message: 'User already exists' })

            const hashedPassword = await hashPassword(password)

            const createdUser = await User.create({
                name,
                password: hashedPassword,
            })

            return res.status(200).send(createdUser)
        }catch(err){
            return res.status(400).send(err)
        }
    },
    async delete(req, res) {
        const { user_id } = req.params
        const { auth } = req.headers

        if(user_id !== auth) return res.status(400).send({ message: 'Unauthorized'})

        try{
            const deletedUser = await User.findByIdAndDelete(user_id)

            return res.status(200).send({ status: 'deleted', user: deletedUser})
        }catch(err){
            return res.status(400).send(err)
        }
    },

    async index(req, res) {
        try{
            const allUsers = await User.find()
            return res.status(200).send(allUsers)


        }catch(err){
            return res.status(400).send(err)
        }
    }
}