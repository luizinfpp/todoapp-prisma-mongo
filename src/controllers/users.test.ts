import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { UserController } from "./users";
import { connectToDb } from "../db";
import { Db, ObjectId } from "mongodb";
import { ListWithId, UserWithId } from "../types";

const isDev = process.env.VITE_NODE_ENV === "dev";

describe.skipIf(!isDev)("user controller unit tests - with test db", () => {
  const name = "test name";
  const newName = "new test name";

  const userController = new UserController();
  let user, userHelper: UserWithId;

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
  });

  test("create user", async () => {
    expect.assertions(2);

    await userController.create({ db: db, userName: name }).then((u) => {
      user = u;

      expect(u).toBeTruthy();
      expect(u.name).toEqual(name);
    });
  });

  test("create user with same name", async () => {
    expect.assertions(1);

    expect(
      await userController.create({ db: db, userName: name })
    ).rejects.toThrowError();
  });

  test("get user by username", async () => {
    expect.assertions(2);

    await userController.get({ db: db, userName: name }).then((u) => {
      expect(u).toBeTruthy();
      expect(u.name).toEqual(name);
    });
  });

  test("get user with not found username", async () => {
    expect.assertions(1);

    expect(
      await userController.get({ db: db, userName: newName })
    ).rejects.toThrowError();
  });

  test("fetch user lists", () => {
    expect.assertions(1);

    userController.fetchAllLists({ db: db, id: user._id }).then((lists) => {
      expect(lists).toBeInstanceOf(Array<ListWithId>);
    });
  });

  test("set new name", () => {
    expect.assertions(1);

    userController
      .setName({ db: db, id: user._id, newName: newName })
      .then(() => {
        userController.get({ db: db, userName: name }).then((u) => {
          expect(u).toBeFalsy();
        });
      });
  });

  test("set name with user not found", async () => {
    expect.assertions(1);

    expect(
      await userController.setName({
        db: db,
        id: new ObjectId(user._id + "a"),
        newName: newName,
      })
    ).rejects.toThrowError();
  });

  test("set name with already existing name", async () => {
    expect.assertions(1);

    userHelper = await userController.create({ db: db, userName: name });

    expect(
      await userController.setName({ db: db, id: user._id, newName: name })
    ).rejects.toThrowError();
  });

  test("delete user", () => {
    expect.assertions(2);

    userController
      .delete({ db: db, id: user._id })
      .then((result) => {
        expect(result).toBeTruthy();
      })
      .then(() => {
        userController.get({ db: db, userName: name }).then((u) => {
          expect(u).toBeFalsy();
        });
      });
  });

  test("delete user not found", async () => {
    expect.assertions(1);

    expect(
      await userController.delete({ db: db, id: user._id })
    ).rejects.toThrowError();
  });

  afterAll(() => {
    userController.delete({ db: db, id: userHelper._id });
  });
});
