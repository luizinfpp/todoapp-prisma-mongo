import { User } from "../../../entities/objects";
import { WithError } from "../../../entities/types";
import { dbObject } from "./db";

export interface IUserRepository{
  create(db: dbObject, user: User): Promise<boolean>;
  delete(db: dbObject, user: User): Promise<void>;
  exists(db: dbObject, name: string): Promise<boolean>;
  get(db: dbObject, name: string): Promise<User>;
  getAll(db: dbObject): Promise<User[]>;
}