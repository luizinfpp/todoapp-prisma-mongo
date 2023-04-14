import { Db, MongoClient } from "mongodb";

let dbConnection: Db

function connectToDb(connStr: string, callbackConnect: Function) {
  MongoClient.connect(connStr)
    .then(client => {
      dbConnection = client.db();
      console.log("Connected to todo-app database.");
      callbackConnect();
    })
    .catch(err => {
      console.log(err);
      callbackConnect(err);
    });
}

const getDb = () => dbConnection

export { connectToDb, getDb }