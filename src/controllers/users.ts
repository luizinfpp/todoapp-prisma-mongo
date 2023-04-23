import { User, UserWithId, ListWithId } from "../types";
import { Db, ObjectId } from "mongodb";

interface UserControllerInterface {

  createUser?(db: Db, id: ObjectId): Promise<UserWithId>;
  deleteUser?(db: Db, id: ObjectId): Promise<boolean>;
  getUser(db: Db, name: string): Promise<UserWithId>;
  fetchUserLists?(db: Db, id: ObjectId): Promise<ListWithId[]>;
  setUserName?(db: Db, id: ObjectId, newName: string): Promise<UserWithId>;
}

export class UserController implements UserControllerInterface {

  getUser = (db: Db, name: string) =>
    new Promise<UserWithId>(async (resolve, reject) => {
      db.collection<User>("users").findOne({ name: name })
        .then((user) => {
          if (user)
            resolve(user);
          else
            reject("There is no user with the given name.");
        })
        .catch(( err ) => {
          reject("Database error. Could not fetch users. " + err);
        });
    });
}
