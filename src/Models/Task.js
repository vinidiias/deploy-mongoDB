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
    }
})

module.exports = mongoose.model('Task', Schema)