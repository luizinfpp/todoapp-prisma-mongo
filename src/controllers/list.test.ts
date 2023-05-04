import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { ListController } from "./lists";
import { connectToDb, getDb } from "../db";
import { Db, ObjectId } from "mongodb";
import { ListItemWithId, ListWithId, UserWithId } from "../types";
import { UserController } from "./users";
import {  ListItemController } from "./listItems"; 

const isDev = (process.env.VITE_NODE_ENV === "dev");

describe.skipIf(!isDev)("list controller unit tests - with test db", () => {
  let name = "list test";
  let newName = "list test second";

  let text = "something I need to do";

  const listController = new ListController();
  const userController = new UserController();
  const itemController = new ListItemController();
  let user: UserWithId;
  let list: ListWithId;
  let item: ListItemWithId;

  const { VITE_MONGO_TEST_HOST, VITE_MONGO_TEST_PORT, VITE_MONGO_TEST_DBNAME } = process.env;
  let db: Db;
  let connectionStr = `mongodb://${VITE_MONGO_TEST_HOST}:${VITE_MONGO_TEST_PORT}/${VITE_MONGO_TEST_DBNAME}`;

  beforeAll(() => {
    connectToDb(connectionStr, (err) => {
      if (!err) {
        db = getDb();
      }
    });

    userController.create({ db: db, userName: "Mark New User" }).then((u) => {
      user = u;
    });

    itemController.create({ db: db, text: text }).then((i) => {
      item = i;
    })

  });

  test("create list", () => {
    listController.create({ db: db, user: user._id, name: name }).then((l) => {
      list = l;
      expect(l).toBeTruthy();
      expect(l.name).toEqual(name);
    });
  });

  test("get list", () => {
    listController.get({ db: db, user: user._id, listName: name }).then((l) => {
      expect(l).toBeTruthy();
      expect(l.name).toEqual(name);
    });
  });

  test("add item to list", () => {
    listController.addItem({ db: db, id: list._id, idListItem: item._id }).then((l) => {
      list = l;

      expect(l).toBeTruthy();
      expect(l.items.length).toEqual(1);
      expect(l.items[0].text).toEqual(text);
    });
  });

  test('list all items in list', () => {
    listController.fetchAllItems({ db: db, id: list._id }).then((itemList) => {
      expect(itemList).toBeTruthy();
      expect(itemList.length).toEqual(1);
      expect(itemList[0].text).toEqual(text);
    })
  })

  test("remove item from list", () => {
    listController.removeItem({ db: db, id: list._id, idListItem: list.items[0]._id }).then((l) => {
      expect(l).toBeTruthy();
      expect(l.items.length).toEqual(0);
    });
  });

  test("set new name", () => {
    listController
      .setName({ db: db, id: list._id, newName: newName })
      .then(() => {
        listController.get({ db: db, user: user._id, listName: name }).then((l) => {
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
          .get({ db: db, user: user._id, listName: newName })
          .then((l) => {
            expect(l).toBeFalsy();
          });
      });
  });

  afterAll(() => {
    userController.delete({ db: db, id: user._id });
    itemController.delete({ db: db, id: item._id });
  });

});
