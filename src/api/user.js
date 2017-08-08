import path from 'path'

import mongosking from 'mongoskin'

const ObjectId = require('mongodb').ObjectID;
const mongoUri = 'mongodb://localhost:27017/notifications-meli-server';
const db = mongosking.db(mongoUri, {native_parser:true})



export const create_user = (req, res) =>{
   const users = db.collection('users')
   const userGroup = db.collection('userGroup')
   users.findOne({"username" : req.body.username}, (err,doc) => {
     if (err){
       res.status = 500
       res.json({"status" : "error", "message": err.toString()})
     }
     if (doc) {
        res.json({"status":"error", "message": "Username already exists"})
     } else {
       userGroup.findOne({'group_name' : req.body.userGroup},(err,doc) =>{
         if (err){
           res.status = 500
           res.json({"status" : "error", "message": err.toString()})
         }
         if (doc){
           users.insertOne(req.body, (err, resp) =>{
             if (err){
               res.status = 500
               res.json({"status" : "error", "message": err.toString()})
             }
              res.json({"status" : "ok", "message" : "Record inserted correctly"})
           })
         } else {
           res.json({"status" : "error", "message" : "The user group does not exist."})
         }
       })
     }
   })
}


export const all_users = (req, res) =>{
  const users = db.collection('users')
  users.find({}).toArray( (err, doc) =>{
    if (err){
      res.status = 500
      res.json({"status" : "error", "message": err.toString()})
    }
    return res.json(doc);
  })
}

export const user_by_id = (req, res) =>{
  const users = db.collection('users')
  const id = new ObjectId(req.params.id)
  users.findOne({'_id':id},(err,doc) =>{
    if (err){
      res.status = 500
      res.json({"status" : "error", "message": err.toString()})
    }
      return res.json(doc);
  })
}


export const read_user_notification = (req, res) =>{
  const users = db.collection('users')
  const user_id = new ObjectId(req.body.user_id)
  const notification_id = req.body.notification_id
  users.update(
              {
                "_id" : user_id
              },
              {
                $addToSet: {
                  'read_notifications': notification_id
              }
            }, (err,response) =>{
      res.status = 204
      res.json({"status" : "ok", "message" : "Resource updated correctly."});
    })
}
