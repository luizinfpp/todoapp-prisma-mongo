import { ListItemWithId } from "../types";
import { Db, ObjectId } from "mongodb";

interface ListItemControllerInterface {
  create?(input: { db: Db; text: string }): Promise<ListItemWithId>;
  delete?(input: { db: Db; id: ObjectId }): Promise<boolean>;
  
  isChecked?(input: { db: Db; id: ObjectId }): Promise<ListItemWithId>;
  toggleCheck?(input: { db: Db; id: ObjectId }): Promise<ListItemWithId>;
}

export class ListItemController implements ListItemControllerInterface {
  create(input: { db: Db; text: string; }): Promise<ListItemWithId> {
    return new Promise((resolve, reject) => { reject() });
  }

  delete(input: { db: Db; id: ObjectId; }): Promise<boolean> {
    return new Promise((resolve, reject) => { reject() });
  }

  isChecked(input: { db: Db; id: ObjectId; }): Promise<ListItemWithId> {
    return new Promise((resolve, reject) => {  reject() });
  }

  toggleCheck(input: { db: Db; id: ObjectId; }): Promise<ListItemWithId> {
    return new Promise((resolve, reject) => { reject() });
  }
    
}