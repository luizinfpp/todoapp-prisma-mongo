import { ListWithId, ListItemWithId } from "../types";
import { Db, ObjectId } from "mongodb";

interface ListControllerInterface {
  create?(input: { db: Db; user: ObjectId; name: string }): Promise<ListWithId>;
  delete?(input: { db: Db; id: ObjectId }): Promise<boolean>;
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
  create(input: { db: Db; user: ObjectId; name: string }): Promise<ListWithId> {
    return new Promise((resolve, reject) => {});
  }

  delete(input: { db: Db; id: ObjectId }): Promise<boolean> {
    return new Promise((resolve, reject) => {});
  }

  get(input: {
    db: Db;
    user: ObjectId;
    listName: string;
  }): Promise<ListWithId> {
    return new Promise((resolve, reject) => {});
  }

  setName(input: {
    db: Db;
    id: ObjectId;
    newName: string;
  }): Promise<ListWithId> {
    return new Promise((resolve, reject) => {});
  }

  addItem(input: {
    db: Db;
    id: ObjectId;
    idListItem: ObjectId;
  }): Promise<ListWithId> {
    return new Promise((resolve, reject) => {});
  }

  fetchAllItems(input: { db: Db; id: ObjectId }): Promise<ListItemWithId[]> {
    return new Promise((resolve, reject) => {});
  }

  removeItem(input: {
    db: Db;
    id: ObjectId;
    idListItem: ObjectId;
  }): Promise<ListWithId> {
    return new Promise((resolve, reject) => {});
  }
}
