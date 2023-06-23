import { describe, test, expect, beforeAll, afterAll } from "vitest";
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
    let itemId: ObjectId;
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

    test("create list item", async () => {
      expect.assertions(2);

      await liController.create({ db: db, text: text }).then((li) => {
        itemId = li;
        expect(li).toBeTruthy();
        expect(li).toBeInstanceOf(ObjectId);
      });
    });

    test("get list item", async () => {
      expect.assertions(2);

      await liController.get({ db: db, id: itemId }).then((li) => {
        item = li;
        expect(li).toBeTruthy();
        expect(li.text).toEqual(text);
      });
    });

    test("if item is checked", async () => {
      expect.assertions(1);

      await liController
        .isChecked({ db: db, id: item._id })
        .then((liChecked) => {
          expect(liChecked).toBeFalsy();
        });
    });

    test("if trying to know if unexisting item is checked", async () => {
      expect.assertions(1);

      await expect(
        liController.isChecked({ db: db, id: new ObjectId() })
      ).rejects.toThrowError();
    });

    test("toggle item check", async () => {
      expect.assertions(2);

      await expect(
        liController.toggleCheck({ db: db, id: item._id })
      ).resolves.toBeUndefined();
      
      await liController.isChecked({ db: db, id: item._id }).then((result) => {
        expect(result).toBeTruthy();
      });
    });

    test("if trying toggle check of unexisting item", async () => {
      expect.assertions(1);

      await expect(liController.toggleCheck({db: db, id: new ObjectId() })).rejects.toThrowError();
    });

    test("delete list item", () => {
      expect.assertions(1);

      expect(
        liController.delete({ db: db, id: item._id })
      ).resolves.toBeUndefined();
    });

    test("delete unexisting item", async () => {
      expect.assertions(1);

      await expect(liController.delete({ db: db, id: new ObjectId() })).rejects.toThrowError();
    });

    afterAll(() => {
      liController.delete({ db: db, id: item._id }).catch(() => {});
    });
  }
);
