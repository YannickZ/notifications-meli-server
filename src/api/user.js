import path from 'path'

import mongosking from 'mongoskin'

const ObjectId = require('mongodb').ObjectID;
const mongoUri = 'mongodb://localhost:27017/notifications-meli-server';
const db = mongosking.db(mongoUri, {native_parser:true})

export const all_users = (req, res) =>{
  const users = db.collection('users')
  users.find({}).toArray( (err, doc) =>{
    if(err) throw(err);
    return res.json(doc);
  })

}
