import { User, List, ListItem } from "../../../entities/objects";
import { dbObject } from "./db";

export interface IListRepository {
  create(db: dbObject, list: List): Promise<string>;
  delete(db: dbObject, list: List): Promise<void>;
  exists(db: dbObject, name: string, user: User): Promise<boolean>;
  get(db: dbObject, name: string, user: User): Promise<List>;
  getAll(db: dbObject, user: User): Promise<List[]>;
  setName(db: dbObject, list: List, newName: string): Promise<void>;
  addItem(db: dbObject, list: List, listItem: ListItem): Promise<void>;
  fetchAllItems(db: dbObject, list: List): Promise<ListItem[]>;
  removeItem(db: dbObject, list: List, listItem: ListItem): Promise<void>;
}
