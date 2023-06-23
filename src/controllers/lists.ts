import { ListWithId, ListItemWithId, List, ListItem } from "../types";
import { Db, ObjectId } from "mongodb";

interface ListControllerInterface {
  create?(input: { db: Db; user: ObjectId; name: string }): Promise<ObjectId>;
  delete?(input: { db: Db; id: ObjectId }): Promise<void>;
  get?(input: {
    db: Db;
    user: ObjectId;
    listName: string;
  }): Promise<ListWithId>;
  setName?(input: { db: Db; id: ObjectId; newName: string }): Promise<void>;

  addItem?(input: {
    db: Db;
    id: ObjectId;
    idListItem: ObjectId;
  }): Promise<void>;
  fetchAllItems?(input: { db: Db; id: ObjectId }): Promise<ListItemWithId[]>;
  removeItem?(input: {
    db: Db;
    id: ObjectId;
    idListItem: ObjectId;
  }): Promise<void>;
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
        .collection<List>("lists")
        .insertOne({ name: input.name, user: input.user, items: [] })
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
      input.db
        .collection("lists")
        .deleteOne({ _id: input.id })
        .then((result) => {
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
      input.db
        .collection<List>("lists")
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

  setName(input: { db: Db; id: ObjectId; newName: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      input.db
        .collection<List>("lists")
        .updateOne({ _id: input.id }, { $set: { name: input.newName } })
        .then((result) => {
          if (result.modifiedCount > 0) resolve();
          else reject("No list was found with the given id.");
        })
        .catch((err) =>
          reject("Database error. Could not update list. " + err)
        );
    });
  }

  addItem(input: {
    db: Db;
    id: ObjectId;
    idListItem: ObjectId;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      input.db
        .collection<ListItem>("list-items")
        .findOne({ _id: input.idListItem })
        .then((li) => {
          if (li) {
            input.db
              .collection<List>("lists")
              .updateOne(
                { _id: input.id },
                { $push: { items: input.idListItem } }
              )
              .then((result) => {
                if (result.modifiedCount > 0) resolve();
                else reject("No list was found with the given id.");
              })
              .catch((err) =>
                reject("Database error. Could not update list. " + err)
              );
          } else reject("There is no list item with the given id.");
        })
        .catch((err) =>
          reject("Database error. Could not update list. " + err)
        );
    });
  }

  fetchAllItems(input: { db: Db; id: ObjectId }): Promise<ListItemWithId[]> {
    return new Promise((resolve, reject) => {
      input.db
        .collection<List>("lists")
        .findOne({ _id: input.id })
        .then((list) => {
          if (list) {
            input.db
              .collection<ListItem>("list-items")
              .find({ _id: { $in: list.items } })
              .toArray()
              .then((items) => {
                if (items) resolve(items);
                else reject("There is no list item with the given id.");
              })
              .catch((err) =>
                reject("Database error. Could not update list. " + err)
              );
          } else reject("There is no list item with the given id.");
        })
        .catch((err) =>
          reject("Database error. Could not find list. " + err)
        );
    });
  }

  removeItem(input: {
    db: Db;
    id: ObjectId;
    idListItem: ObjectId;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      
      input.db.collection<List>("lists").updateOne({ _id: input.id }, { $pull: { items: input.idListItem } }).then((result) => {
        if (result.modifiedCount > 0) resolve();
        else reject("No list was found with the given id.");
      }
      ).catch((err) =>
        reject("Database error. Could not update list. " + err)
      );
    });
  }
}
