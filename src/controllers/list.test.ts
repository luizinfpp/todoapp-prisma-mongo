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
  let userId: ObjectId;
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

    await userController
      .create({ db: db, userName: "Mark New User" })
      .then((u) => {
        userId = u;
      });

    await itemController.create({ db: db, text: text }).then((i) => {
      itemController
        .get({ db: db, id: i })
        .then((response) => (item = response));
    });
  });

  test("create list", async () => {
    expect.assertions(2);

    console.log(userId);

    await listController
      .create({ db: db, user: userId, name: name })
      .then((l) => {
        expect(l).toBeTruthy();
        expect(l).toBeInstanceOf(ObjectId);
      });
  });

  test("get list", async () => {
    expect.assertions(2);

    await listController
      .get({ db: db, user: userId, listName: name })
      .then((l) => {
        list = l;

        expect(l).toBeTruthy();
        expect(l.name).toEqual(name);
      });
  });

  test("get list with not found listname", async () => {
    expect.assertions(1);

    await expect(
      listController.get({ db: db, user: userId, listName: newName })
    ).rejects.toThrowError();
  });

  test("add item to list", async () => {
    expect.assertions(3);

    await expect(listController.addItem({ db: db, id: list._id, idListItem: item._id })).resolves.toBeUndefined()
    
    await listController.get({ db: db, user: userId, listName: name }).then( l => {
      list = l;
      expect(l.items.length).toEqual(1);
    })

    await itemController.get({ db: db, id: list.items[0] }).then( i => {
      expect(i.text).toEqual(text);
    })
  });

  test("add item with not found list", async () => {
    expect.assertions(1);

    await expect(
      listController.addItem({
        db: db,
        id: new ObjectId(),
        idListItem: item._id,
      })
    ).rejects.toThrowError();
  });

  test("add unexisting item to list", async () => {
    expect.assertions(1);

    await expect(
      listController.addItem({
        db: db,
        id: list._id,
        idListItem: new ObjectId(),
      })
    ).rejects.toThrowError();
  });

  test("list all items in list", async () => {
    expect.assertions(3);

    await listController.fetchAllItems({ db: db, id: list._id }).then((itemList) => {
      expect(itemList).toBeTruthy();
      expect(itemList.length).toEqual(1);
      expect(itemList[0].text).toEqual(text);
    });
  });

  test("list all items with not found list", async () => {
    expect.assertions(1);

    await expect(
      listController.fetchAllItems({
        db: db,
        id: new ObjectId(),
      })
    ).rejects.toThrowError();
  });

  test("remove item from list", async () => {
    expect.assertions(1);

    await expect(
      listController.removeItem({
        db: db,
        id: list._id,
        idListItem: list.items[0],
      })
    ).resolves.toBeUndefined();
  });

  test("remove item of not found list", async () => {
    expect.assertions(1);

    await expect(
      listController.removeItem({
        db: db,
        id: new ObjectId(),
        idListItem: list.items[0],
      })
    ).rejects.toThrowError();
  });

  test("remove unexisting item from list", async () => {
    expect.assertions(1);

    await expect(
      listController.removeItem({
        db: db,
        id: list._id,
        idListItem: new ObjectId(),
      })
    ).rejects.toThrowError();
  });

  test("set new name", async () => {
    expect.assertions(2);

    await expect(
      listController.setName({ db: db, id: list._id, newName: newName })
    ).resolves.toBeUndefined();

    await expect(
      listController.get({ db: db, user: userId, listName: name })
    ).rejects.toThrowError();
  });

  test("set name with not found list", async () => {
    expect.assertions(1);

    await expect(
      listController.setName({
        db: db,
        id: new ObjectId(),
        newName: newName,
      })
    ).rejects.toThrowError();
  });

  test("delete list", () => {
    expect.assertions(2);

    expect(
      listController.delete({ db: db, id: list._id })
    ).resolves.toBeUndefined();
    expect(
      listController.get({ db: db, user: userId, listName: name })
    ).rejects.toThrowError();
  });

  test("delete not found list", async () => {
    expect.assertions(1);

    await expect(
      listController.delete({
        db: db,
        id: new ObjectId(),
      })
    ).rejects.toThrowError();
  });

  afterAll(() => {
    userController.delete({ db: db, id: userId }).catch(() => {});
    itemController.delete({ db: db, id: item._id }).catch(() => {});
  });
});
