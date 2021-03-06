import path from 'path'

import express from 'express'
import mongosking from 'mongoskin'
import api from './api'
import bodyParser from 'body-parser'

const port = 8080
const MongoClient = require('mongodb').MongoClient
const app = express()

const mongoUri = 'mongodb://localhost:27017/notifications-meli-server';
const db = mongosking.db(mongoUri, {native_parser:true})

app.use(bodyParser.json());

app.use( (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})


const errorHandler = (err, req, res, next) => {
  res.status(500);
  res.render('error', { error: err });
}

app.use(errorHandler);
app.use('/api', api(db))


app.listen(port, () => {
	console.log(`notifications-meli-server iniciado en ${port}`)
})


module.exports = app
