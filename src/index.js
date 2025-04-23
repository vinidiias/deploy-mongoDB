const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const router = require('./Routes/Router')

const app = express()

const dbUri = process.env.DB_URI

mongoose.connect(dbUri)
.then((res) => {
    console.log('Connected to database')
}).catch((err) => console.log(err))

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(3333, () => {
    console.log('Server running on port 3333')
})