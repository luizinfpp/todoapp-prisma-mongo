import { User } from "../../entities/objects";
import { dbObject } from "./repositories/db";
import { IUserRepository } from "./repositories/user";

export class UserController {
  db: dbObject;
  private userRepo: IUserRepository;

  constructor(db: dbObject, userRepository: IUserRepository) {
    this.db = db;
    this.userRepo = userRepository;
  }

  createUserOnDB = async (user: User): Promise<string> => {
    return await this.userRepo.create(this.db, user);
  }

  deleteOfDb = async (user: User): Promise<void> => {
    return await this.userRepo.delete(this.db, user);
  }

  existsOnDb = async (name: string): Promise<boolean> => {
    return await this.userRepo.exists(this.db, name);
  } 

  getAllUsersFromDb = async (): Promise<User[]> => {
    return await this.userRepo.getAll(this.db);
  }; 

  getUserFromDb = async (name: string): Promise<User> => {
    return await this.userRepo.get(this.db, name);
  }; 

  setUserNameOnDb = async (user: User, newName: string): Promise<void> => {
    return await this.userRepo.setName(this.db, user, newName);
  }; 
}
