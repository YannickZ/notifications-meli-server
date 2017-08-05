import path from 'path'
import { Router } from 'express'
import {login} from './auth'
import {all_notifications, notifications_by_id} from './notifications'
import {all_users, user_by_id} from './user'
import {all_groups, group_by_name} from './userGroup'



const ObjectId = require('mongodb').ObjectID;

export default (db) => {
	const api = Router()

/******* Notifications endpoints *******/
	/* Endpoint to get all notifications */
	api.get('/notifications', all_notifications)

	/* Endpoint to get a single notification by id */
	api.get('/notifications/:id', notifications_by_id)

/******* Authentication endpoints *******/
	/* Endpoint for authentication, curl -X POST -H "Content-Type: application/json" -d '{"username":"juan","password":"123asd"}' 'localhost:8080/api/login' */
	api.post('/login', login);

/******* User endpoints *******/
	/* Endpoint to get all users */
	api.get('/users', all_users)

	/* Endpoint to get a single user by id */
	api.get('/users/:id', user_by_id)


/******* UserGroup endpoints *******/
	/* Endpoint to get all user groups */
	api.get('/user_groups', all_groups)

	/* Endpoint to get a user group by name */
	api.get('/user_groups/:name', group_by_name)


	return api
}
