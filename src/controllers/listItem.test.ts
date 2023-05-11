import { describe, test, expect, beforeAll } from "vitest";
import { connectToDb } from "../db";
import { Db, ObjectId } from "mongodb";
import { ListItemWithId } from "../types";
import { ListItemController } from "./listItems";

const isDev = process.env.VITE_NODE_ENV === "dev";

describe.skipIf(!isDev)(
  "list item controller unit tests - with test db",
  () => {
    const {
      VITE_MONGO_TEST_HOST,
      VITE_MONGO_TEST_PORT,
      VITE_MONGO_TEST_DBNAME,
    } = process.env;
    let db: Db;
    let connectionStr = `mongodb://${VITE_MONGO_TEST_HOST}:${VITE_MONGO_TEST_PORT}/${VITE_MONGO_TEST_DBNAME}`;

    const liController = new ListItemController();
    let item: ListItemWithId;
    const text = "new item";

    beforeAll(async () => {
      await connectToDb(connectionStr)
        .then((dbConn) => {
          db = dbConn;
        })
        .catch((err) => {
          throw new Error(err);
        });
    });

    test("create list item", () => {
      expect.assertions(2);

      liController
        .create({ db: db, text: text })
        .then((li) => {
          item = li;
          
          expect(li).toBeTruthy();
          expect(li.text).toEqual(text);
        })
    });

    test("if item is checked", () => {
      expect.assertions(2);

      liController
        .isChecked({ db: db, id: item._id })
        .then((li) => {
          expect(li).toBeTruthy();
          expect(li.checked).toBeFalsy();
        })
    });

    test('if trying to know if unexisting item is checked', async () => {
      expect.assertions(1);

      const result = await liController.isChecked({ db: db, id: new ObjectId(item._id + "a") });

      expect(result).rejects.toThrowError();
    
    });

    test("toggle item check", () => {
      expect.assertions(2);

      liController
        .toggleCheck({ db: db, id: item._id })
        .then((li) => {
          expect(li).toBeTruthy();
          expect(li.checked).toBeTruthy();
        })
    });

    test('if trying toggel check of unexisting item', async () => {
      expect.assertions(1);

      const result = await liController.toggleCheck({ db: db, id: new ObjectId(item._id + "a") });

      expect(result).rejects.toThrowError();
    
    });

    test("delete list item", () => {
      expect.assertions(1);

      liController
        .delete({ db: db, id: item._id })
        .then((res) => {
          expect(res).toBeTruthy();
        })
    });

    test('delete unexisting item', async () => {
      expect.assertions(1);

      const result = await liController.delete({ db: db, id: new ObjectId(item._id + "a") });

      expect(result).rejects.toThrowError();
    })

  }
);
