import path from 'path'

import express from 'express'
import mongosking from 'mongoskin'
import api from './api'

const port = 8080
const MongoClient = require('mongodb').MongoClient
const app = express()

const mongoUri = 'mongodb://localhost:27017/notifications-meli-server';


const db = mongosking.db(mongoUri, {native_parser:true})

app.use('/api', api(db))

app.listen(port, () => {
	console.log(`notifications-meli-server iniciado en ${port}`)
})


module.exports = app
