import { Db, MongoClient } from "mongodb";
import {
  DbInstanceRepository,
  dbObject,
} from "../../adapters/controllers/repositories/db";
import { WithError } from "../../entities/types";

let dbConnection: Db;

export class DbInstanceMongo implements DbInstanceRepository {
  connect = async (connectionString: string): Promise<dbObject> => {
    return new Promise<Db>((resolve, reject) => {
      MongoClient.connect(connectionString)
        .then((client) => {
          dbConnection = client.db();
          console.log("Connected to todo-app database.");
          resolve(dbConnection);
        })
        .catch((err) => {
          console.log(err);
          reject("Could not connect to database " + err);
        });
    });
  }
}

