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

let testReturn: any;

export class ListController implements ListControllerInterface {
  create(input: { db: Db; user: ObjectId; name: string }): Promise<ListWithId> {
    return new Promise((resolve, reject) => {resolve(testReturn)});
  }

  delete(input: { db: Db; id: ObjectId }): Promise<boolean> {
    return new Promise((resolve, reject) => {resolve(testReturn)});
  }

  get(input: {
    db: Db;
    user: ObjectId;
    listName: string;
  }): Promise<ListWithId> {
    return new Promise((resolve, reject) => {resolve(testReturn)});
  }

  setName(input: {
    db: Db;
    id: ObjectId;
    newName: string;
  }): Promise<ListWithId> {
    return new Promise((resolve, reject) => {resolve(testReturn)});
  }

  addItem(input: {
    db: Db;
    id: ObjectId;
    idListItem: ObjectId;
  }): Promise<ListWithId> {
    return new Promise((resolve, reject) => {resolve(testReturn)});
  }

  fetchAllItems(input: { db: Db; id: ObjectId }): Promise<ListItemWithId[]> {
    return new Promise((resolve, reject) => {resolve(testReturn)});
  }

  removeItem(input: {
    db: Db;
    id: ObjectId;
    idListItem: ObjectId;
  }): Promise<ListWithId> {
    return new Promise((resolve, reject) => {resolve(testReturn)});
  }
}
