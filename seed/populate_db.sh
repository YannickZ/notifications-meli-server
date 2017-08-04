#!/bin/bash

mongoimport --db notifications-meli-server --collection notifications --type json --file "notifications.json" --jsonArray
mongoimport --db notifications-meli-server --collection users --type json --file "users.json" --jsonArray
mongoimport --db notifications-meli-server --collection userGroup --type json --file "userGroup.json" --jsonArray
