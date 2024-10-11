const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    importance: {
        type: String,
        required: true
    },
    importance_id: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Tipo é um ObjectId (identificador único de um documento no MongoDB)
        ref: 'User', // Faz referência ao modelo 'User', criando uma associação entre a tarefa e um usuário
        required: true, // O campo é obrigatório, ou seja, toda tarefa deve estar associada a um usuário
    }
})

module.exports = mongoose.model('Task', Schema)