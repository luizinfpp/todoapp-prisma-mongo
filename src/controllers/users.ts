import { User, UserWithId, ListWithId } from "../types";
import { Db, ObjectId } from "mongodb";

interface UserControllerInterface {
  create?(input: { db: Db; userName: string }): Promise<UserWithId>;
  delete?(input: { db: Db; id: ObjectId }): Promise<boolean>;
  get(input: { db: Db; userName: string }): Promise<UserWithId>;
  fetchAllLists?(input: { db: Db, id: ObjectId }): Promise<ListWithId[]>;
  setName?(input: {db: Db, id: ObjectId, newName: string}): Promise<UserWithId>;
}

export class UserController implements UserControllerInterface {
  get = ({ db, userName }: { db: Db; userName: string }) =>
    new Promise<UserWithId>(async (resolve, reject) => {
      db.collection<User>("users")
        .findOne({ name: userName })
        .then((user) => {
          if (user) resolve(user);
          else reject("There is no user with the given name.");
        })
        .catch((err) => {
          reject("Database error. Could not fetch users. " + err);
        });
    });
}
