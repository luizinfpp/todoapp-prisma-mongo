import { User, UserWithId, ListWithId } from "../types";
import { Db, ObjectId } from "mongodb";

interface UserControllerInterface {
  createUser?(input: { db: Db; userName: string }): Promise<UserWithId>;
  deleteUser?(input: { db: Db; id: ObjectId }): Promise<boolean>;
  getUser(input: { db: Db; userName: string }): Promise<UserWithId>;
  fetchAllListsOfUser?(input: { db: Db, id: ObjectId }): Promise<ListWithId[]>;
  setUserName?(input: {db: Db, id: ObjectId, newName: string}): Promise<UserWithId>;
}

export class UserController implements UserControllerInterface {
  getUser = ({ db, userName }: { db: Db; userName: string }) =>
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
