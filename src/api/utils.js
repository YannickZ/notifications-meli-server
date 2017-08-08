import path from 'path'

import mongosking from 'mongoskin'

const ObjectId = require('mongodb').ObjectID;
const mongoUri = 'mongodb://localhost:27017/notifications-meli-server';
const db = mongosking.db(mongoUri, {native_parser:true})

export const user_notifications = (req, res) => {
  // Collection definitions
  const notifications = db.collection('notifications')
  const users = db.collection('users')
  const userGroup = db.collection('userGroup')

  // Logic to filter the notifications making queries on the different entities && callback hell

    users.findOne({'username' : req.params.username},(err, user)=>{
      if (err){
        res.status = 500
        res.json({"status" : "error", "message": err.toString()})
      }
      const userb =  user;
    	userGroup.findOne({'group_name' : user.userGroup},(err, user_group)=>{
        if (err){
          res.status = 500
          res.json({"status" : "error", "message": err.toString()})
        }
    		notifications.find({"type" : {$in : user_group.notification_tags }}).toArray( (err, notifications) => {
          if (err){
            res.status = 500
            res.json({"status" : "error", "message": err.toString()})
          }

          //Just in case es6 syntax is not that clear, im filtering the notifications array with 2 criteria = 1) The notifications mustn't be in the array of user's read notifications 2) The notification must be in the user's array of subscribed applications.

          let filteredNotifications = notifications.filter(obj => {return !user.read_notifications.includes(obj._id) && user.subscribed_applications.includes(obj.application)})

          // Sorting data so it is returned order by priority

          filteredNotifications = filteredNotifications.sort((a,b) => {
                      return b.priority - a.priority
          })
          res.json({"status" : "ok", "user" : userb, "notifications":filteredNotifications})
    })
    	})
    })
  }
