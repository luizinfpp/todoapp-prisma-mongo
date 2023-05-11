import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { ListController } from "./lists";
import { connectToDb } from "../db";
import { Db, ObjectId } from "mongodb";
import { ListItemWithId, ListWithId, UserWithId } from "../types";
import { UserController } from "./users";
import { ListItemController } from "./listItems";

const isDev = process.env.VITE_NODE_ENV === "dev";

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

  const { VITE_MONGO_TEST_HOST, VITE_MONGO_TEST_PORT, VITE_MONGO_TEST_DBNAME } =
    process.env;
  let db: Db;
  let connectionStr = `mongodb://${VITE_MONGO_TEST_HOST}:${VITE_MONGO_TEST_PORT}/${VITE_MONGO_TEST_DBNAME}`;

  beforeAll(async () => {
    await connectToDb(connectionStr)
      .then((dbConn) => {
        db = dbConn;
      })
      .catch((err) => {
        throw new Error(err);
      });

    userController.create({ db: db, userName: "Mark New User" }).then((u) => {
      user = u;
    });

    itemController.create({ db: db, text: text }).then((i) => {
      item = i;
    });
  });

  test("create list", () => {
    expect.assertions(2);

    listController.create({ db: db, user: user._id, name: name }).then((l) => {
      list = l;
      expect(l).toBeTruthy();
      expect(l.name).toEqual(name);
    });
  });

  test("get list", () => {
    expect.assertions(2);

    listController.get({ db: db, user: user._id, listName: name }).then((l) => {
      expect(l).toBeTruthy();
      expect(l.name).toEqual(name);
    });
  });

  test("get list with not found listname", async () => {
    expect.assertions(1);

    expect(
      await listController.get({ db: db, user: user._id, listName: newName })
    ).rejects.toThrowError();
  });

  test("add item to list", () => {
    expect.assertions(3);

    listController
      .addItem({ db: db, id: list._id, idListItem: item._id })
      .then((l) => {
        list = l;

        expect(l).toBeTruthy();
        expect(l.items.length).toEqual(1);
        expect(l.items[0].text).toEqual(text);
      });
  });

  test("add item with not found list", async () => {
    expect.assertions(1);

    expect(
      await listController.addItem({
        db: db,
        id: new ObjectId(list._id + "a"),
        idListItem: item._id,
      })
    ).rejects.toThrowError();
  });

  test("add unexisting item to list", async () => {
    expect.assertions(1);

    expect(
      await listController.addItem({
        db: db,
        id: list._id,
        idListItem: new ObjectId(item._id + "a"),
      })
    ).rejects.toThrowError();
  });

  test("list all items in list", () => {
    expect.assertions(3);

    listController.fetchAllItems({ db: db, id: list._id }).then((itemList) => {
      expect(itemList).toBeTruthy();
      expect(itemList.length).toEqual(1);
      expect(itemList[0].text).toEqual(text);
    });
  });

  test("list all items with not found list", async () => {
    expect.assertions(1);

    expect(
      await listController.fetchAllItems({
        db: db,
        id: new ObjectId(list._id + "a"),
      })
    ).rejects.toThrowError();
  });

  test("remove item from list", () => {
    listController
      .removeItem({ db: db, id: list._id, idListItem: list.items[0]._id })
      .then((l) => {
        expect(l).toBeTruthy();
        expect(l.items.length).toEqual(0);
      })
      .catch((error) => {
        expect(0).toEqual(1);
      });
  });

  test("remove item of not found list", async () => {
    expect.assertions(1);

    expect(
      await listController.removeItem({
        db: db,
        id: new ObjectId(list._id + "a"),
        idListItem: list.items[0]._id,
      })
    ).rejects.toThrowError();
  
  });

  test("remove unexisting item from list", async () => {
    expect.assertions(1);

    expect( listController.removeItem({
      db: db,
      id: list._id,
      idListItem: new ObjectId(list.items[0]._id + "a"),
    })).rejects.toThrowError();
  });

  test("set new name", () => {
    expect.assertions(1);

    listController
      .setName({ db: db, id: list._id, newName: newName })
      .then(() => {
        listController
          .get({ db: db, user: user._id, listName: name })
          .then((l) => {
            expect(l).toBeFalsy();
          });
      });
  });

  test("set name with not found list", () => {
    expect.assertions(1);

    expect(
      listController.setName({
        db: db,
        id: new ObjectId(list._id + "a"),
        newName: newName,
      })
    ).rejects.toThrowError();
  });

  test("delete list", () => {
    expect.assertions(2);

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

  test("delete not found list", async () => {
    expect.assertions(1);

    expect( listController.delete({
      db: db,
      id: new ObjectId(list._id + "a"),
    }) ).rejects.toThrowError();
  });

  afterAll(() => {
    userController.delete({ db: db, id: user._id });
    itemController.delete({ db: db, id: item._id });
  });
});
