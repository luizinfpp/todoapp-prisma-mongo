import { Db, MongoClient } from "mongodb";

export let dbConnection: Db

export function connectToDb(connStr: string) {
  return new Promise<Db>((resolve, reject) => {
    
  })
}

