import { ListWithId, ListItemWithId } from "../types";
import { Db, ObjectId } from "mongodb";

interface ListControllerInterface {
  create?(input: { db: Db; idUser: ObjectId, name: string }): Promise<ListWithId>;
  delete?(input: { db: Db; id: ObjectId }): Promise<boolean>;
  get?(input: { db: Db; idUser: ObjectId , listName: string }): Promise<ListWithId>;  
  setName?(input: {db: Db, id: ObjectId, newName: string}): Promise<ListWithId>;

  addItem?(input: { db: Db, id: ObjectId, idListItem: ObjectId }) : Promise<boolean>;
  fetchAllItems?(input: { db: Db, id: ObjectId }): Promise<ListItemWithId[]>;
  removeItem?(input: { db: Db, id: ObjectId, idListItem: ObjectId }) : Promise<boolean>;
}

export class ListController implements ListControllerInterface {
  
}