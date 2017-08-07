import path from 'path'

import mongosking from 'mongoskin'

const ObjectId = require('mongodb').ObjectID;
const mongoUri = 'mongodb://localhost:27017/notifications-meli-server';
const db = mongosking.db(mongoUri, {native_parser:true})

export const all_notifications = (req, res) =>{
  const notifications = db.collection('notifications')
  notifications.find({}).toArray( (err, doc) =>{
    if(err) throw(err);
    return res.json(doc);
  })

}

export const notifications_by_id = (req, res) =>{
  const notifications = db.collection('notifications')
  const id = new ObjectId(req.params.id)
  notifications.findOne({'_id':id},(err,doc) =>{
      if(err) throw(err);
      return res.json(doc);
  })
}


export const create_notification = (req, res) =>{
   const notifications = db.collection('notifications')
   notifications.insertOne(req.body, (err, resp) =>{
      if (err) throw (err);
      res.json({"status" : "ok", "message" : "Record inserted correctly"})
   })

}

export const delete_notification = (req,res) => {
  const notifications = db.collection('notifications')
  const id = new ObjectId(req.params.id)
  notifications.remove({'_id' : id}, (err, result) =>{
    if(err) throw (err);
    res.status = 200
    res.json({"status" : "ok", "message" : result.result.n + " notifications deleted."})
  })
}
