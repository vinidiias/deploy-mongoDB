const User = require('../Models/User')
const bcrypt = require('bcrypt')

module.exports = {
    async create(req, res) {
        const { name, password } = req.body
        try{
            const userExists = await User.findOne({ name })
            if(!userExists) return res.status(400).send({ message: 'User does not exist' })
            
            const validPassword = await bcrypt.compare(password, userExists.password)
            if(!validPassword) return res.status(400).send({ message: 'Password invalid' })
            
            return res.status(200).send(userExists)
        }catch(err) {
            return res.status(400).send(err)
        }
    }
}