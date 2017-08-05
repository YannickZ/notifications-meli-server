import path from 'path'

import mongosking from 'mongoskin'

const ObjectId = require('mongodb').ObjectID;
const mongoUri = 'mongodb://localhost:27017/notifications-meli-server';
const db = mongosking.db(mongoUri, {native_parser:true})


const validate = (username, password, callback) => {
    const users = db.collection('users')
    var user = {}
    users.findOne({'username': username, 'password': password}, (err,doc) => {
      if (err) throw (err);
      callback(null,doc)
    })
}

export const login = (req, res) =>{

  const username = req.body.username
  const password = req.body.password

  let response = {}
  let user = {}

  validate(username, password, (err, doc)=>{
    user = doc
    if (!user){
      res.status(401)
      res.json({'status' : 'error', 'message' : 'Wrong credentials'})
      return;
    }
    res.json(user);
  })

}
