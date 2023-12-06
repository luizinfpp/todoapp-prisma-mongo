import { DbInstanceRepository, dbObject } from "./repositories/db";
import { IUserRepository } from "./repositories/user"

let dbInstance: dbObject | null = null;

type reposType = { user: IUserRepository }

let repos : reposType | null = null;

const connect = async (
  connStr: string,
  dbRepo: DbInstanceRepository
): Promise<void> => {
  return new Promise<void>(() => {
    dbRepo.connect(connStr).then((db) => { dbInstance = db; });
  });
};

const getDb = async (): Promise<dbObject> => {
  return new Promise<dbObject>((resolve, reject) => {
    if (dbInstance == null) reject(new Error("Database not connected."));
    else resolve(dbInstance);
  });
};

const getUserRepo = async (): Promise<IUserRepository> => {
  return new Promise<IUserRepository>((resolve, reject) => {
    if (repos == null) reject(new Error("Repositories information was not set yet."));
    else resolve(repos.user);
  });
};

const setRepos = (userRepo: IUserRepository): void => {
    repos = { user: userRepo };
};

export { connect, getDb, getUserRepo, setRepos };
