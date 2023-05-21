import { ListWithId, ListItemWithId, List } from "../types";
import { Db, ObjectId } from "mongodb";

interface ListControllerInterface {
  create?(input: { db: Db; user: ObjectId; name: string }): Promise<ObjectId>;
  delete?(input: { db: Db; id: ObjectId }): Promise<void>;
  get?(input: {
    db: Db;
    user: ObjectId;
    listName: string;
  }): Promise<ListWithId>;
  setName?(input: {
    db: Db;
    id: ObjectId;
    newName: string;
  }): Promise<ListWithId>;

  addItem?(input: {
    db: Db;
    id: ObjectId;
    idListItem: ObjectId;
  }): Promise<ListWithId>;
  fetchAllItems?(input: { db: Db; id: ObjectId }): Promise<ListItemWithId[]>;
  removeItem?(input: {
    db: Db;
    id: ObjectId;
    idListItem: ObjectId;
  }): Promise<ListWithId>;
}

export class ListController implements ListControllerInterface {

  /**Create a new list.
   * @param input.db The database connection.
   * @param input.user The user's id.
   * @param input.name The name of the list.
   * @returns The id of the list.
   */
  create(input: { db: Db; user: ObjectId; name: string }): Promise<ObjectId> {
    return new Promise((resolve, reject) => {
      input.db
        .collection<List>("list")
        .insertOne({ name: input.name, user: input.user })
        .then((result) => {
          if (result) resolve(result.insertedId);
          else reject("There was an error creating the list.");
        })
        .catch((err) =>
          reject("Database error. Could not insert list. " + err)
        );
    });
  }

  /**
   * Deletes a list.
   * @param input.db The database connection.
   * @param input.id The id of the list.
   * @returns if sucessful
   */
  delete(input: { db: Db; id: ObjectId }): Promise<void> {
    return new Promise((resolve, reject) => {
      input.db.collection("list").deleteOne({ _id: input.id }).then((result) => {
        if (result.deletedCount > 0) resolve();
        else reject("No list was found with the given id.");
      })
      .catch((err) =>
        reject("Database error. Could not delete list. " + err)
      );
    });
  }

  /**Gets a list.
   * @param input.db The database connection.
   * @param input.user The user's id.
   * @param input.listName The name of the list.
   * @returns The list.
    */
  get(input: {
    db: Db;
    user: ObjectId;
    listName: string;
  }): Promise<ListWithId> {
    return new Promise((resolve, reject) => {
      input.db.collection<List>("list")
        .findOne({ name: input.listName, user: input.user })
        .then((li) => {
          if (li) resolve(li);
          else reject("There is no list with the given name.");
        })
        .catch((err) => {
          reject("Database error. Could not fetch lists. " + err);
        });
    });
  }

  setName(input: {
    db: Db;
    id: ObjectId;
    newName: string;
  }): Promise<ListWithId> {
    return new Promise((resolve, reject) => {reject()});
  }

  addItem(input: {
    db: Db;
    id: ObjectId;
    idListItem: ObjectId;
  }): Promise<ListWithId> {
    return new Promise((resolve, reject) => {reject()});
  }

  fetchAllItems(input: { db: Db; id: ObjectId }): Promise<ListItemWithId[]> {
    return new Promise((resolve, reject) => {reject()});
  }

  removeItem(input: {
    db: Db;
    id: ObjectId;
    idListItem: ObjectId;
  }): Promise<ListWithId> {
    return new Promise((resolve, reject) => {reject()});
  }
}
