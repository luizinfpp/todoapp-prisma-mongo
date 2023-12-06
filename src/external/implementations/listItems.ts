// import { ListItem, ListItemWithId } from "../types";
// import { Db, ObjectId } from "mongodb";
// import { getDb } from "./db";

// interface ListItemControllerInterface {
//   create?(input: { db: Db; text: string }): Promise<ObjectId>;
//   get?(input: { db: Db; id: ObjectId }): Promise<ListItemWithId>;
//   delete?(input: { db: Db; id: ObjectId }): Promise<void>;

//   isChecked?(input: { db: Db; id: ObjectId }): Promise<boolean>;
//   toggleCheck?(input: { db: Db; id: ObjectId }): Promise<void>;
// }

// export class ListItemController implements ListItemControllerInterface {

//   /**
//    * Creates a new list item.
//    * @param db the database connection
//    * @param text the text of the item
//    * @returns the id of the new item
//    */
//   create(input: { db: Db; text: string }): Promise<ObjectId> {
//     return new Promise((resolve, reject) => {

//       input.db
//         .collection("list-items")
//         .insertOne({ text: input.text, checked: false })
//         .then((result) => {
//           if (result) resolve(result.insertedId);
//           else reject("There was an error creating the item.");
//         })
//         .catch((err) =>
//           reject("Database error. Could not insert item. " + err)
//         );
//     });
//   }

//   /**
//    * Gets a list item.
//    * 
//    * @remarks
//    * This method is used to get a list item from the database.
//    * 
//    * @param db the database connection
//    * @param id the id of the item to get
//    * @returns the list item
//    */
//   get(input: { db: Db; id: ObjectId }): Promise<ListItemWithId> {
//     return new Promise((resolve, reject) => {
//       input.db.collection<ListItem>("list-items")
//         .findOne({ _id: input.id })
//         .then((li) => {
//           if (li) resolve(li);
//           else reject("There is no item with the given name.");
//         })
//         .catch((err) => {
//           reject("Database error. Could not fetch items. " + err);
//         });
//     });
//   }

//   /**
//    * Deletes a list item.
//    * @param db the database connection
//    * @param id the id of the item to delete
//    * @returns if sucessful
//    */
//   delete(input: { db: Db; id: ObjectId }): Promise<void> {
//     return new Promise((resolve, reject) => {
//       input.db.collection("list-items").deleteOne({ _id: input.id }).then((result) => {
//         if (result.deletedCount > 0) resolve();
//         else reject("No item was found with the given id.");
//       })
//       .catch((err) =>
//         reject("Database error. Could not delete item. " + err)
//       );
//     });
//   }  

//   isChecked(input: { db: Db; id: ObjectId }): Promise<boolean> {
//     return new Promise((resolve, reject) => {
//       input.db.collection("list-items").findOne({ _id: input.id }).then((result) => {
//         if(result != null) resolve(result.checked)
//         else reject("No list item was found with the given id.")
//       })
//       .catch((err) =>
//         reject("Database error. Could not delete item. " + err)
//       );
//     });
//   }

//   toggleCheck(input: { db: Db; id: ObjectId }): Promise<void> {
//     return new Promise((resolve, reject) => {
      
//       input.db.collection("list-items").findOne({ _id: input.id }).then((result) => {
//         if(result != null) {
//           input.db.collection("list-items").updateOne({ _id: input.id }, { $set: { checked: !result.checked } }).then((updateResult) => {
//             if(updateResult.modifiedCount > 0) resolve();
//             else reject("No list item was found with the given id.")
//           })
//         }
//         else reject("No list item was found with the given id.")
//       })
//       .catch((err) =>
//         reject("Database error. Could not update item. " + err)
//       );
      
//     });
//   }
// }
