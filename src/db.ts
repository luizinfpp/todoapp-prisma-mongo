import { Db, MongoClient } from "mongodb";

export let dbConnection: Db

export function connectToDb(connStr: string) {
  return new Promise<Db>((resolve, reject) => {
    MongoClient.connect(connStr)
    .then(client => {
      dbConnection = client.db();
      console.log("Connected to todo-app database.");
      resolve(dbConnection);
    })
    .catch(err => {
      console.log(err);
      reject("Could not connect to database " + err)
    });
  })
}