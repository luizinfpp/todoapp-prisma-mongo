import { User } from "../../entities/objects";
import { getDb, getUserRepo } from "./db";
import { dbObject } from "./repositories/db";
import { IUserRepository } from "./repositories/user";

export class UserController {

  createUserOnDB = async (user: User): Promise<string> => {
    const db : dbObject = await getDb();
    const userRepo : IUserRepository = await getUserRepo();

    return await userRepo.create(db, user);
  }

  deleteOfDb = async (user: User): Promise<void> => {
    const db : dbObject = await getDb();
    const userRepo : IUserRepository = await getUserRepo();

    return await userRepo.delete(db, user);
  }

  existsOnDb = async (name: string): Promise<boolean> => {
    const db : dbObject = await getDb();
    const userRepo : IUserRepository = await getUserRepo();

    return await userRepo.exists(db, name);
  } 

  getAllUsersFromDb = async (): Promise<User[]> => {
    const db : dbObject = await getDb();
    const userRepo : IUserRepository = await getUserRepo();
    
    return await userRepo.getAll(db);
  }; 

  getUserFromDb = async (name: string): Promise<User> => {
    const db : dbObject = await getDb();
    let userRepo : IUserRepository = await getUserRepo();

    return await userRepo.get(db, name);
  }; 

  setUserNameOnDb = async (user: User, newName: string): Promise<void> => {
    const db : dbObject = await getDb();
    const userRepo : IUserRepository = await getUserRepo();
    
    return await userRepo.setName(db, user, newName);
  }; 
}
