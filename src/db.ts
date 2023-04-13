import { MongoClient } from "mongodb";

let dbConnection

const connectToDb = (connStr: string) => {
  MongoClient.connect(connStr)
    .then(client => {
      dbConnection = client.db()
      console.log("Connected to todo-app database.")
    })
    .catch(err => {
      console.log(err)
    })
}

const getDb = () => dbConnection

export default { connectToDb, getDb }