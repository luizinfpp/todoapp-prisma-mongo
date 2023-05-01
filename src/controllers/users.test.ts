import { describe, test, expect, beforeAll } from "vitest";
import { UserController } from "./users";
import { connectToDb, getDb } from "../db";
import { Db } from "mongodb";
import { ListWithId, UserWithId } from "../types";

const isDev = process.env.NODE_ENV === "development";

describe.skipIf(!isDev)("user controller unit tests - with test db", () => {
  const name = "test name";
  const newName = "new test name";

  const userController = new UserController();
  let user: UserWithId;

  const { MONGO_TEST_HOST, MONGO_TEST_PORT, MONGO_TEST_DBNAME } = process.env;
  let db: Db;
  let connectionStr = `mongodb://${MONGO_TEST_HOST}:${MONGO_TEST_PORT}/${MONGO_TEST_DBNAME}`;

  beforeAll(() => {
    connectToDb(connectionStr, (err) => {
      if (!err) {
        db = getDb();
      }
    });
  });

  test("create user", () => {
    userController.create({ db: db, userName: name }).then((u) => {
      user = u;
      expect(u).toBeTruthy();
      expect(u.name).toEqual(name);
    });
  });

  test("get user by username", () => {
    userController.get({ db: db, userName: name }).then((u) => {
      expect(u).toBeTruthy();
      expect(u.name).toEqual(name);
    });
  });

  test("fetch user lists", () => {
    user.fetchAllLists({ db: db, id: user._id }).then(lists => {
        expect(lists).toBeInstanceOf(Array<ListWithId>)        
    }).catch(error => {
        expect(error).toEqual("User doesn't have any list created.")
    })

    
  });

  test("set new name", () => {
    userController
      .setName({ db: db, id: user._id, newName: newName })
      .then(() => {
        userController.get({ db: db, userName: name }).then((u) => {
          expect(u).toBeFalsy();
        });
      });
  });

  test("delete user", () => {
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
});
