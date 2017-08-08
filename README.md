## Introducción
 - Para instalar y correr este proyecto, es necesario tener Node.js y una instancia de mongodb instalada y corriendo.

## Tecnologías
 - Node.js
 - Express
 - MongoDB

## Instalación de dependencias

```sh
$ npm i
```

## Ejecución
```sh
$ npm run dev
```

## Seed database
- Para llenar la base de datos con el fin de probar los endpoints y el funcionamiento de la api es necesario tener una instancia de mongo corriendo localmente en el puerto standart de mongo (27017) y ejecutar los siguientes comandos.
```sh
$ cd seed/
$ sh populate_db.sh
```
