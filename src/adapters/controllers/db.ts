import { DbInstanceRepository, dbObject } from "./repositories/db";
import { IListRepository } from "./repositories/list";
import { IUserRepository } from "./repositories/user"

let dbInstance: dbObject | null = null;

type reposType = { user: IUserRepository, list: IListRepository }

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

const getListRepo = async (): Promise<IListRepository> => {
  return new Promise<IListRepository>((resolve, reject) => {
    if (repos == null) reject(new Error("Repositories information was not set yet."));
    else resolve(repos.list);
  });
};

const getUserRepo = async (): Promise<IUserRepository> => {
  return new Promise<IUserRepository>((resolve, reject) => {
    if (repos == null) reject(new Error("Repositories information was not set yet."));
    else resolve(repos.user);
  });
};

const setRepos = (userRepo: IUserRepository, listRepo: IListRepository): void => {
    repos = { user: userRepo, list: listRepo };
};

export { connect, getDb, getUserRepo, getListRepo, setRepos };
