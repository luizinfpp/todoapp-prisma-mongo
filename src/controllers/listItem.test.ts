import { describe, test, expect, beforeAll } from "vitest";
import { connectToDb, getDb } from "../db";
import { Db } from "mongodb";
import { ListItemWithId } from "../types";
import { ListItemController } from "./listItems";

const isDev = process.env.NODE_ENV === "development";

describe.skipIf(!isDev)("list item controller unit tests - with test db", () => {
  
  const { MONGO_TEST_HOST, MONGO_TEST_PORT, MONGO_TEST_DBNAME } = process.env;
  let db: Db;
  let connectionStr = `mongodb://${MONGO_TEST_HOST}:${MONGO_TEST_PORT}/${MONGO_TEST_DBNAME}`;

  const liController = new ListItemController();
  let item : ListItemWithId;
  const text = "new item"

  beforeAll(() => {
    connectToDb(connectionStr, (err) => {
      if (!err) {
        db = getDb();
      }
    });
  });

  test("create list item", () => {
    liController.create({ db: db, text: text }).then((li) => {
        item = li;

        expect(li).toBeTruthy();
        expect(li.text).toBe(text);
    }); 
  });

  test("if item is checked", () => {
    liController.isChecked({ db: db, id: item._id }).then((li) => {
        expect(li).toBeTruthy();
        expect(li.checked).toBeFalsy();
    }); 
  });

  test("toggle item check", () => {
    liController.toggleCheck({ db: db, id: item._id }).then((li) => {
        expect(li).toBeTruthy();
        expect(li.checked).toBeTruthy();
    }); 
  });

  test("delete list item", () => {
    liController.delete({ db: db, id: text }).then((res) => {       
        expect(res).toBeTruthy();
    }); 
  });

  
});
