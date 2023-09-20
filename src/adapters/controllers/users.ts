import { User, UserWithId, ListWithId, List } from "../../types";
import { Db, InsertOneResult, ObjectId } from "mongodb";

interface UserControllerInterface {
  create(input: { db: Db; userName: string }): Promise<ObjectId>;
  delete(input: { db: Db; id: ObjectId }): Promise<void>;
  get(input: { db: Db; userName: string }): Promise<UserWithId>;
  getAll(input: { db: Db }): Promise<UserWithId[]>;
  fetchAllLists?(input: { db: Db; id: ObjectId }): Promise<ListWithId[]>;
  setName?(input: {
    db: Db;
    id: ObjectId;
    newName: string;
  }): Promise<void>;
}

let testReturn: any;

export class UserController implements UserControllerInterface {

  /**
   * Creates a new user in the database.
   * @param db the database
   * @param userName the name of the user to be created
   * @returns the new user id
   */
  create(input: { db: Db; userName: string }): Promise<ObjectId> {
    return new Promise<ObjectId>(async (resolve, reject) => {
      input.db.collection<User>("users")
        .insertOne({ name: input.userName })
        .then((result) => {
          if (result) resolve(result.insertedId);
          else reject("There was an error creating the user.");
        })
        .catch((err) => {
          reject("Database error. Could not insert user. " + err);
        });
    });
  }

  /**
   * This function deletes a user from a database based on their ID.
   * @param db The database
   * @param id The id of the user to be deleted
   * @returns A Promise that resolves to void (i.e., nothing) if the user with the given id is
   * successfully deleted from the "users" collection in the input database, or rejects with an error
   * message if there is a problem with the deletion process.
   */
  delete(input: { db: Db; id: ObjectId }): Promise<void> {
    const query = { _id: input.id }
    
    return new Promise<void>(async (resolve, reject) => {
      input.db.collection<User>("users")
        .deleteOne(query)
        .then((result) => {
          if (result.deletedCount > 0) resolve();
          else reject("No user was found with the given id.");
        })
        .catch((err) => {
          reject("Database error. Could not insert user. " + err);
        });
    });
  }

  /**
   * Gets a user by its name.
   * @param db the database
   * @param userName the name of the user 
   * @returns a promise that resolves with the user or reject with an error message
   */
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

  getAll(input: { db: Db; }): Promise<UserWithId[]> {
    return new Promise((resolve, reject) => {
      input.db
        .collection<User>("users")
        .find({})
        .toArray()
        .then((users) => {
          if (users) resolve(users);
          else reject("No users were found.");
        })
        .catch((err) => {
          reject("Database error. Could not fetch users. " + err);
        });
    });
      
  }

  /**
   * Fetches all lists for a user.
   * @param db the database
   * @param id the id of the user 
   * @returns a promise that resolves with the lists or rejects with an error message
   */
  fetchAllLists(input: { db: Db; id: ObjectId }): Promise<ListWithId[]> {
    let lists : ListWithId[] = [];

    return new Promise<ListWithId[]>(async (resolve, reject) => { 
      input.db.collection<List>("lists").find({ user: input.id }).forEach((list) => {
        lists.push(list);
      }).then(() => {
        resolve(lists);  
      }).catch((err) => { 
        reject("Database error. Could not fetch lists. " + err);
      })
    });
  }

  // TODO FIX not working
  setName(input: {
    db: Db;
    id: ObjectId;
    newName: string;
  }): Promise<void> {
    return new Promise<void>(async (resolve, reject) => { 
      input.db.collection<User>("users")
        .updateOne({ _id: input.id }, { $set: { name: input.newName } })
        .then((result) => {
          if (result.modifiedCount > 0) resolve();
          else reject("No user was found with the given id.");
        })
        .catch((err) => {
          reject("Database error. Could not update user. " + err);
        });
     });
  }
}
