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

  getUserFromDb = (name: string): User => {
    let user : User | undefined = undefined;

    this.userRepo.get(this.db, name).then(u => user = u).catch((err) => { throw new Error(err) });

    if (user == undefined) throw new Error("There is no user with the given name.");
    
    return user;
  };
}
