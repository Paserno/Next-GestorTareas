# Next.js OpenTrello
Para correr localmente, se necesita BD
````
docker-compose up -d
````

* El -d, significa __detached__


## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__
* MongoDB URL Local: 
```
mongodb://localhost:27017/db
```
* Reconstruir los módulos de node
```
yarn install
```
* Levantar Next
```
yarn dev
```

## Llenar la base de datos con informacion de prueba

con el seed: 
```
http://localhost:3000/api/seed
```


## Modulos utilizados

* [Material UI](https://mui.com)
* [Mongoose](https://mongoosejs.com)
* [axios](https://axios-http.com/docs/intro)
* Fechas / [date-fns](https://date-fns.org)
* Notificaciones / [NotiStack](https://notistack.com/features/basic)
* [uuid](https://github.com/uuidjs/uuid)