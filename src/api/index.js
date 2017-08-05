import path from 'path'
import { Router } from 'express'
import {login} from './auth'
import {all_notifications} from './notifications'
import {all_users} from './user'
import {all_groups} from './userGroup'



const ObjectId = require('mongodb').ObjectID;

export default (db) => {
	const api = Router()

	/* Endpoint to get all notifications */
	api.get('/notifications', all_notifications)

	/* Endpoint for authentication, curl -X POST -H "Content-Type: application/json" -d '{"username":"juan","password":"123asd"}' 'localhost:8080/api/login' */
	api.post('/login', login);

	/* Endpoint to get all users */
	api.get('/users', all_users)

	/* Endpoint to get all user groups */
	api.get('/user_groups', all_groups)


	return api
}
