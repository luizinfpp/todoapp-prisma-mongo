import { User } from "../../entities/objects";
import { dbObject } from "./repositories/db";
import { IUserRepository } from "./repositories/user";

export class UserController {
  db: dbObject;
  userRepo: IUserRepository;

  constructor(db: dbObject, private userRepository: IUserRepository) {
    this.db = db;
    this.userRepo = userRepository;
  }

  createUserOnDB = async (user: User): Promise<boolean> => {
    return await this.userRepo.create(this.db, user).catch((err) => { throw new Error(err) });
  }

  deleteOfDb = async (user: User): Promise<void> => {
    return await this.userRepo.delete(this.db, user).catch((err) => { throw new Error(err) });
  }

  existsOnDb = async (name: string): Promise<boolean> => {
    return await this.userRepo.exists(this.db, name).catch((err) => { throw new Error(err) });
  } 

  getAllUsersFromDb = async (): Promise<User[]> => {
    return await this.userRepo.getAll(this.db).catch((err) => { throw new Error(err) });
  }; 

  getUserFromDb = async (name: string): Promise<User> => {
    return await this.userRepo.get(this.db, name).catch((err) => { throw new Error(err) });
  }; 
}
