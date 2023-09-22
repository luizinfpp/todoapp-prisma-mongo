import { WithError } from "../../entities/types";
import { DbInstanceRepository, dbObject } from "./repositories/db";

export class DbInstance {
  dbRepo: DbInstanceRepository;

  constructor(dbRepo: DbInstanceRepository) {
    this.dbRepo = dbRepo;
  }

  connect = (connStr: string): dbObject => {
    let result = this.dbRepo
      .connect(connStr)
      .then((db) => db)
      .catch((err) => {
        throw new Error(err);
      });

     return result; 
  }
  
}
