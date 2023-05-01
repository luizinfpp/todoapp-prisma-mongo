import { ListItemWithId } from "../types";
import { Db, ObjectId } from "mongodb";

interface ListItemControllerInterface {
  create?(input: { db: Db; text: string }): Promise<ListItemWithId>;
  delete?(input: { db: Db; id: ObjectId }): Promise<boolean>;
  
  isChecked?(input: { db: Db; id: ObjectId }): Promise<ListItemWithId>;
  toggleCheck?(input: { db: Db; id: ObjectId }): Promise<ListItemWithId>;
}

export class ListItemController implements ListItemControllerInterface {
  
}