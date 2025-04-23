const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const router = require('./Routes/Router');

const app = express();
const dbUri = process.env.DB_URI;

mongoose.connect(dbUri)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use('/api', router); // importante colocar prefixo pra evitar conflito com Vercel

module.exports.handler = serverless(app);
