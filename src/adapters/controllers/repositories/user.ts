import { User } from "../../../entities/objects";
import { WithError } from "../../../entities/types";
import { dbObject } from "./db";

export interface IUserRepository{
  get(db: dbObject, name: string): Promise<User>;
}