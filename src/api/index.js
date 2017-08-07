import path from 'path'
import { Router } from 'express'
import {login} from './auth'
import {all_notifications, notifications_by_id, delete_notification, create_notification} from './notifications'
import {all_users, user_by_id, read_user_notification} from './user'
import {all_groups, group_by_name} from './userGroup'



const ObjectId = require('mongodb').ObjectID;

export default (db) => {
	const api = Router()

/******* Notifications endpoints *******/

  /* Endpoint to create a notification */
	/*curl example curl -X POST -H "Content-Type: application/json" -d '{"message" : "Nuevos features(9.0.0) en produccion funcionando correctamente.", "type" : "release", "application" : "meli website", "priority" : 3, "destination" : [ "web notification", "email" ]}' 'localhost:8080/api/notification'*/
	api.post('/notification', create_notification)

	/* Endpoint to get all notifications */
	api.get('/notifications', all_notifications)

	/* Endpoint to get a single notification by id */
	api.get('/notifications/:id', notifications_by_id)

	/* Endpoint to delete a notification, curl example = $ curl -i -X DELETE http://localhost:8080/api/notifications/5984f3619decee47c0388837*/
	api.delete('/notifications/:id', delete_notification)


/******* Authentication endpoints *******/
	/* Endpoint for authentication, curl -X POST -H "Content-Type: application/json" -d '{"username":"juan","password":"123asd"}' 'localhost:8080/api/login' */
	api.post('/login', login);

/******* User endpoints *******/
	/* Endpoint to get all users */
	api.get('/users', all_users)

	/* Endpoint to get a single user by id */
	api.get('/users/:id', user_by_id)

	/* Endpoint to mark a notification as read for an especific user only if the notification hasnt been marked as read for that user*/
	/* curl example curl -i -X PUT -H 'Content-Type: application/json' -d '{"user_id": "5988d90007a588f2561cda1c","notification_id":"5984f3619decee47c0388838"}' http://localhost:8080/api/user/notification */
	api.put('/user/notification', read_user_notification)

/******* UserGroup endpoints *******/
	/* Endpoint to get all user groups */
	api.get('/user_groups', all_groups)

	/* Endpoint to get a user group by name */
	api.get('/user_groups/:name', group_by_name)


	return api
}
