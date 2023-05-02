import { describe, test, expect, beforeAll } from "vitest";
import { ListController } from "./lists";
import { connectToDb, getDb } from "../db";
import { Db } from "mongodb";
import { ListWithId, UserWithId } from "../types";
import { UserController } from "./users";

const isDev = process.env.NODE_ENV === "development";

describe.skipIf(!isDev)("list controller unit tests - with test db", () => {
  let name = "list test";
  let newName = "list test second";

  let text = "something I need to do";
  let newText = "something new I need to do";

  const listController = new ListController();
  const userController = new UserController();
  let user: UserWithId;
  let list: ListWithId;

  const { MONGO_TEST_HOST, MONGO_TEST_PORT, MONGO_TEST_DBNAME } = process.env;
  let db: Db;
  let connectionStr = `mongodb://${MONGO_TEST_HOST}:${MONGO_TEST_PORT}/${MONGO_TEST_DBNAME}`;

  beforeAll(() => {
    connectToDb(connectionStr, (err) => {
      if (!err) {
        db = getDb();
      }
    });

    userController.create({ db: db, userName: "Mark New User" }).then((u) => {
      user = u;
    });
  });

  test("create list", () => {
    listController.create({ db: db, user: user._id, name: name }).then((l) => {
      list = l;
      expect(l).toBeTruthy();
      expect(l.name).toEqual(name);
    });
  });

  test("get list", () => {
    listController.get({ db: db, user: user._id, name: name }).then((l) => {
      expect(l).toBeTruthy();
      expect(l.name).toEqual(name);
    });
  });

  test("add item to list", () => {
    listController.addItem({ db: db, list: list._id, text: text }).then((l) => {
      list = l;

      expect(l).toBeTruthy();
      expect(l.items.length).toEqual(1);
      expect(l.items[0].text).toEqual(text);
    });
  });

  test('list all items in list', () => {
    listController.fetchAllItems({ db: db, list: list._id }).then((itemList) => {
      expect(itemList).toBeTruthy();
      expect(itemList.length).toEqual(1);
      expect(itemList[0].text).toEqual(text);
    })
  ;

  test("remove item from list", () => {
    listController.removeItem({ db: db, list: list._id, itemId: list.items[0]._id }).then((l) => {
      expect(l).toBeTruthy();
      expect(l.items.length).toEqual(0);
    });
  });

  test("set new name", () => {
    listController
      .setName({ db: db, id: list._id, newName: newName })
      .then(() => {
        listController.get({ db: db, user: user, listName: name }).then((l) => {
          expect(l).toBeFalsy();
        });
      });
  });

  test("delete user", () => {
    listController
      .delete({ db: db, id: list._id })
      .then((result) => {
        expect(result).toBeTruthy();
      })
      .then(() => {
        listController
          .get({ db: db, user: user, listName: newName })
          .then((l) => {
            expect(l).toBeFalsy();
          });
      });
  });
});
