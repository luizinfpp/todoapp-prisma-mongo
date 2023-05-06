import { describe, test, expect, beforeAll } from "vitest";
import { UserController } from "./users";
import { connectToDb } from "../db";
import { Db } from "mongodb";
import { ListWithId, UserWithId } from "../types";

const isDev = (process.env.VITE_NODE_ENV === "dev");


describe.skipIf(!isDev)("user controller unit tests - with test db", () => {
  const name = "test name";
  const newName = "new test name";

  const userController = new UserController();
  let user: UserWithId;

  const { VITE_MONGO_TEST_HOST, VITE_MONGO_TEST_PORT, VITE_MONGO_TEST_DBNAME } = process.env;
  let db: Db;
  let connectionStr = `mongodb://${VITE_MONGO_TEST_HOST}:${VITE_MONGO_TEST_PORT}/${VITE_MONGO_TEST_DBNAME}`;

  beforeAll(async () => {
    await connectToDb(connectionStr).then((dbConn) => {
      db = dbConn;
    })
    .catch((err) => {
      throw new Error(err);
    });
  });

  test("create user", async () => {

    await userController.create({ db: db, userName: name }).then((u) => {
      user = u;
      
      expect(u).toBeTruthy();
      expect(u.name).toEqual(name);
    }).catch(error => {
      expect(0).toEqual(1)
    })
  });

  test("get user by username", async () => {
    
    await userController.get({ db: db, userName: name }).then((u) => {
      expect(u).toBeTruthy();
      expect(u.name).toEqual(name);
    }).catch(error => {
      expect(0).toEqual(1)
    })
  });

  test("fetch user lists", () => {
    userController.fetchAllLists({ db: db, id: user._id }).then(lists => {
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
