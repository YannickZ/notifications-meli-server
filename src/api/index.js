import path from 'path'

import { Router } from 'express'

const ObjectId = require('mongodb').ObjectID;

export default (db) => {
	const api = Router()

 api.get('/notifications', (req,res)=>{
	 const notifications = db.collection('notifications')
	 notifications.find({}).toArray( (err, doc) =>{
		 return res.json(doc);
	 })
 })

	return api
}
