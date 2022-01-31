# Fullstack App

## Frontend

    - React:
    - TypeScript
    - Vite:
    - Tailwind:

## Backend

    - Jakarta EE
    - MicroProfile
    - Lombok

## Database

    - MongoDB

## Instructions on how to run

fter clone the repo, run docker to get mongodb image and process

```
docker pull mongo
docker run --name mongo-sample -p 127.0.0.1:27017:27017 -d mongo
```

After that, get into docker bash to create new user and database
```docker exec -it mongo-sample bash```

```
    mongo
    use testdb
    db.createUser({user: 'sampleUser', pwd:'openliberty', roles: [{ role: 'readWrite', db:'testdb'}]})
```

Then just exit twice to get out

### Running the project

#### Backend

```
    mvn clean package liberty:run-server
```
The server will now listen to port 9080.
Visit this: http://localhost:9080/mongo/ for quick overview

#### Client

cd to client
``` 
yarn
yarn dev 
```
Then the client will listen to port 3000.
http://localhost:3000

### resource:

- JsonArray: https://docs.oracle.com/javaee/7/api/index.html?javax/json/JsonArray.html
- Path params: https://mkyong.com/webservices/jax-rs/jax-rs-pathparam-example/
- https://openliberty.io/guides/rest-intro.html#creating-a-jax-rs-application
- MongoDB: https://github.com/OpenLiberty/sample-mongodb
- CORS: https://stackoverflow.com/questions/56738237/how-to-enable-cors-set-up-for-liberty-server-which-is-installed-through-docker


