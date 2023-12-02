import { DbInstanceRepository, dbObject } from "./repositories/db";
  
let dbInstance : dbObject | null = null;

const connect = async (connStr: string, dbRepo: DbInstanceRepository): Promise<void> => {
  dbRepo
    .connect(connStr)
    .then((db) => dbInstance = db)
    .catch((err) => {
      throw new Error(err);
    });
}

const getDb = (): dbObject => {
  if(dbInstance == null)
    throw new Error("Database not connected.");

  return dbInstance;
}

export { connect, getDb }

  
