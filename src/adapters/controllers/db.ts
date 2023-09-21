import { WithError } from "../../entities/types";
import { DbInstanceRepository, dbObject } from "./repositories/db";

export class DbInstance {

  dbRepo : DbInstanceRepository;

  constructor(dbRepo: DbInstanceRepository){
    this.dbRepo = dbRepo;
  }

  connect(connStr: string) : WithError<dbObject> {
    return this.dbRepo.connect(connStr);
  }
}

