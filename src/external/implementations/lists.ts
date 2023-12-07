import { IListRepository } from "../../adapters/controllers/repositories/list";
import { User, List, ListItem } from "../../entities/objects";
import { Db } from "mongodb";

export class ListMongoRepository implements IListRepository {
  /**Create an user.
   * @param db the database
   * @param user the user
   * @returns a promise that resolves with the boolean if user was sucessfully created
   */
  // create(db: Db, user: User): Promise<string> {
  //   return new Promise<string>(async (resolve, reject) => {
  //     db.collection<User>("users")
  //       .insertOne({ name: user.name })
  //       .then((result) => {
  //         if (result) resolve(user.name);
  //         else reject(new Error("User name already exists on database."));
  //       })
  //       .catch((err) => {
  //         reject(new Error("Database error. Could not insert user. " + err));
  //       });
  //   });
  // }

  // /**
  //  * This function deletes a user from a database based on their ID.
  //  * @param db The database
  //  * @param user The name of the user to be deleted
  //  * @returns A Promise that resolves to void (i.e., nothing) if the user with the given id is
  //  * successfully deleted from the "users" collection in the input database, or rejects with an error
  //  * message if there is a problem with the deletion process.
  //  */
  // delete(db: Db, user: User): Promise<void> {
  //   const query = { name: user.name };

  //   return new Promise<void>(async (resolve, reject) => {
  //     db.collection<User>("users")
  //       .deleteOne(query)
  //       .then((result) => {
  //         if (result.deletedCount > 0) resolve();
  //         else reject(new Error("No user was found with the given id."));
  //       })
  //       .catch((err) => {
  //         reject(new Error("Database error. Could not insert user. " + err));
  //       });
  //   });
  // }

  // /**
  //  * Check if user exists.
  //  * @param db the database
  //  * @param name the name of the user
  //  * @returns a promise that resolves with the boolean if user exists or reject with an error message
  //  */
  // exists = async (db: Db, name: string) => {
  //   return new Promise<boolean>((resolve, reject) => {
  //     db.collection<User>("users")
  //       .findOne({ name: name })
  //       .then((user) => {
  //         if (user) resolve(true);
  //         else resolve(false);
  //       })
  //       .catch((err) => {
  //         reject(new Error("Database error. Could not fetch users. " + err));
  //       });
  //   });
  // };

  // /**
  //  * Gets a list by its name.
  //  * @param db the database
  //  * @param name the name of the user
  //  * @returns a promise that resolves with the user or reject with an error message
  //  */
  // get = async (db: Db, name: string ) => {
  //   return new Promise<List>((resolve, reject) => {
  //     db.collection<List>("lists")
  //       .findOne({ name: name })
  //       .then((list) => {
  //         if (list) resolve(list);
  //         else reject(new Error("There is no list with the given information."));
  //       })
  //       .catch((err) => {
  //         reject(new Error("Database error. Could not fetch lists. " + err));
  //       });
  //   });
  // };

  // /**
  //  * Gets a user by its name.
  //  * @param db the database
  //  * @returns a promise that resolves with all users or reject with an error message
  //  */
  // getAll = async (db: Db): Promise<User[]> => {
  //   return new Promise<User[]>((resolve, reject) => {
  //     db.collection<User>("users")
  //       .find()
  //       .toArray()
  //       .catch((err) => {
  //         reject(new Error("Database error. Could not fetch users. " + err));
  //       });
  //   });
  // };

  // setName = async (db: Db, user: User, newName: string) => {
  //   return new Promise<void>(async (resolve, reject) => {
  //     db.collection<User>("users")
  //       .updateOne({ name: user.name }, { $set: { name: newName } })
  //       .then((result) => {
  //         if (result.modifiedCount > 0) resolve();
  //         else reject(new Error("No user was found with the given id."));
  //       })
  //       .catch((err) => {
  //         reject(new Error("Database error. Could not update user. " + err));
  //       });
  //   });
  // }
}

// export class ListController implements ListControllerInterface {
//   /**Create a new list.
//    * @param input.db The database connection.
//    * @param input.user The user's id.
//    * @param input.name The name of the list.
//    * @returns The id of the list.
//    */
//   create(input: { db: Db; user: ObjectId; name: string }): Promise<ObjectId> {
//     return new Promise((resolve, reject) => {
//       input.db
//         .collection<List>("lists")
//         .insertOne({ name: input.name, user: input.user, items: [] })
//         .then((result) => {
//           if (result) resolve(result.insertedId);
//           else reject("There was an error creating the list.");
//         })
//         .catch((err) =>
//           reject("Database error. Could not insert list. " + err)
//         );
//     });
//   }

//   /**
//    * Deletes a list.
//    * @param input.db The database connection.
//    * @param input.id The id of the list.
//    * @returns if sucessful
//    */
//   delete(input: { db: Db; id: ObjectId }): Promise<void> {
//     return new Promise((resolve, reject) => {
//       input.db
//         .collection("lists")
//         .deleteOne({ _id: input.id })
//         .then((result) => {
//           if (result.deletedCount > 0) resolve();
//           else reject("No list was found with the given id.");
//         })
//         .catch((err) =>
//           reject("Database error. Could not delete list. " + err)
//         );
//     });
//   }

//   /**Gets a list.
//    * @param input.db The database connection.
//    * @param input.user The user's id.
//    * @param input.listName The name of the list.
//    * @returns The list.
//    */
//   get(input: {
//     db: Db;
//     user: ObjectId;
//     listName: string;
//   }): Promise<ListWithId> {
//     return new Promise((resolve, reject) => {
//       input.db
//         .collection<List>("lists")
//         .findOne({ name: input.listName, user: input.user })
//         .then((li) => {
//           if (li) resolve(li);
//           else reject("There is no list with the given name.");
//         })
//         .catch((err) => {
//           reject("Database error. Could not fetch lists. " + err);
//         });
//     });
//   }

//   getAll(input: { db: Db; }): Promise<ListWithId[]> {
//     return new Promise((resolve, reject) => {
//       input.db
//         .collection<List>("lists")
//         .find({})
//         .toArray()
//         .then((lists) => {
//           if (lists) resolve(lists);
//           else reject("No lists were found.");
//         })
//         .catch((err) => {
//           reject("Database error. Could not fetch lists. " + err);
//         });
//     });
//   }

//   setName(input: { db: Db; id: ObjectId; newName: string }): Promise<void> {
//     return new Promise((resolve, reject) => {
//       input.db
//         .collection<List>("lists")
//         .updateOne({ _id: input.id }, { $set: { name: input.newName } })
//         .then((result) => {
//           if (result.modifiedCount > 0) resolve();
//           else reject("No list was found with the given id.");
//         })
//         .catch((err) =>
//           reject("Database error. Could not update list. " + err)
//         );
//     });
//   }

//   addItem(input: {
//     db: Db;
//     id: ObjectId;
//     idListItem: ObjectId;
//   }): Promise<void> {
//     return new Promise((resolve, reject) => {
//       input.db
//         .collection<ListItem>("list-items")
//         .findOne({ _id: input.idListItem })
//         .then((li) => {
//           if (li) {
//             input.db
//               .collection<List>("lists")
//               .updateOne(
//                 { _id: input.id },
//                 { $push: { items: input.idListItem } }
//               )
//               .then((result) => {
//                 if (result.modifiedCount > 0) resolve();
//                 else reject("No list was found with the given id.");
//               })
//               .catch((err) =>
//                 reject("Database error. Could not update list. " + err)
//               );
//           } else reject("There is no list item with the given id.");
//         })
//         .catch((err) =>
//           reject("Database error. Could not update list. " + err)
//         );
//     });
//   }

//   fetchAllItems(input: { db: Db; id: ObjectId }): Promise<ListItemWithId[]> {
//     return new Promise((resolve, reject) => {
//       input.db
//         .collection<List>("lists")
//         .findOne({ _id: input.id })
//         .then((list) => {
//           if (list) {
//             input.db
//               .collection<ListItem>("list-items")
//               .find({ _id: { $in: list.items } })
//               .toArray()
//               .then((items) => {
//                 if (items) resolve(items);
//                 else reject("There is no list item with the given id.");
//               })
//               .catch((err) =>
//                 reject("Database error. Could not update list. " + err)
//               );
//           } else reject("There is no list item with the given id.");
//         })
//         .catch((err) =>
//           reject("Database error. Could not find list. " + err)
//         );
//     });
//   }

//   removeItem(input: {
//     db: Db;
//     id: ObjectId;
//     idListItem: ObjectId;
//   }): Promise<void> {
//     return new Promise((resolve, reject) => {
      
//       input.db.collection<List>("lists").updateOne({ _id: input.id }, { $pull: { items: input.idListItem } }).then((result) => {
//         if (result.modifiedCount > 0) resolve();
//         else reject("No list was found with the given id.");
//       }
//       ).catch((err) =>
//         reject("Database error. Could not update list. " + err)
//       );
//     });
//   }
// }
