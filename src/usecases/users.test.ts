import { describe, test, expect, vi } from "vitest";
import { User } from "../entities/objects";
import { IUserRepository } from "../adapters/controllers/repositories/user";
import { createNewUser, deleteUser, getUser, getAllUsers } from "./user";

const isDev = process.env.VITE_NODE_ENV === "dev";

describe.skipIf(!isDev)("user controller unit tests", () => {
  /***Mocks */
  let mockDb: object = {};

  class mockUserRepoSuccess implements IUserRepository {
    create = vi.fn();
    delete = vi.fn();
    exists = vi.fn();
    get = vi.fn();
    getAll = vi.fn();
  }

  class mockUserRepoFail implements IUserRepository {
    create = vi.fn();
    delete = vi.fn();
    exists = vi.fn();
    get = vi.fn(); // state doesn't exists
    getAll = vi.fn();
  }

  class mockUserRepoError implements IUserRepository {
    create = vi.fn();
    delete = vi.fn();
    exists = vi.fn();
    get = vi.fn();
    getAll = vi.fn();
  }

  const userRepoSuccess = new mockUserRepoFail();
  const userRepoFail = new mockUserRepoSuccess();
  const userRepoError = new mockUserRepoError();

  /***Declarations */
  const name = "test name";
  const newName = "new test name";

  let user = new User(name);

  /***Tests */

  test("create user on db", async () => {
    let result = await createNewUser(mockDb, userRepoSuccess, user);
    expect(result).toHaveReturned();
  });

  test("create user on db - failed attempt", async () => {
    let result = await createNewUser(mockDb, userRepoFail, user);
    expect(result).toThrowError();
  });

  test("create user on db - error thrown", async () => {
    let result = await createNewUser(mockDb, userRepoError, user);
    expect(result).toThrowError();
  });

  test("delete user on db", async () => {
    let result = await deleteUser(mockDb, userRepoSuccess, user);
    expect(result).toHaveReturned();
  });

  test("delete user on db - wrong name", async () => {
    let result = await deleteUser(mockDb, userRepoError, user);
    expect(result).toHaveReturned();
  });

  test("get all users", async () => {
    let result = await getAllUsers(mockDb, userRepoSuccess);

    expect(result).toHaveReturned();
    expect(result).toBeInstanceOf(Array<User>);
  });

  test("get all users - error", async () => {
    let result = await getAllUsers(mockDb, userRepoSuccess);

    expect(result).toThrowError();
  });

  test("get user by username", async () => {
    let result = await getUser(mockDb, userRepoSuccess, name);

    expect(result).toHaveReturned();
    expect(result).toBeInstanceOf(User);
    expect(result.name).toEqual(name);
  });

    test("get user by username - name not found", async () => {
    let result = await getUser(mockDb, userRepoError, name);

    expect(result).toThrowError();
  });

  // const userController = new UserController();
  // let user, userHelper: UserWithId;

  // beforeAll(async () => {
  //   await connectToDb(connectionStr)
  //     .then((dbConn) => {
  //       db = dbConn;
  //     })
  //     .catch((err) => {
  //       throw new Error(err);
  //     });
  // });

  // test("create user", async () => {
  //   expect.assertions(2);

  //   await userController.create({ db: db, userName: name }).then((u) => {

  //     expect(u).toBeTruthy();
  //     expect(u).toBeInstanceOf(ObjectId);
  //   });
  // });

  // test("get all users", async () => {
  //   expect.assertions(2);

  //   await userController
  //     .getAll({ db: db })
  //     .then((u) => {
  //       expect(u).toBeInstanceOf(Array<UserWithId>);
  //       expect(u.length).toBeGreaterThan(0);
  //     });
  // });

  // test("create user with same name", () => {
  //   expect.assertions(1);

  //   expect(
  //     userController.create({ db: db, userName: name })
  //   ).rejects.toThrowError();
  // });

  // test("get user by username", async () => {
  //   expect.assertions(2);

  //   await userController.get({ db: db, userName: name }).then((u) => {
  //     user = u;
  //     expect(u).toBeTruthy();
  //     expect(u.name).toEqual(name);
  //   });
  // });

  // test("get user with not found username", () => {
  //   expect.assertions(1);

  //   expect(
  //     userController.get({ db: db, userName: newName })
  //   ).rejects.toThrowError();
  // });

  // test("fetch user lists", async () => {
  //   expect.assertions(1);

  //   await userController.fetchAllLists({ db: db, id: user._id }).then((lists) => {
  //     expect(lists).toBeInstanceOf(Array<ListWithId>);
  //   });
  // });

  // test("set new name", async () => {
  //   expect.assertions(1);

  //   await userController
  //     .setName({ db: db, id: user._id, newName: newName })

  //   await expect(userController.get({ db: db, userName: name })).rejects.toThrowError();

  // });

  // test("set name with user not found", async () => {
  //   expect.assertions(1);

  //   await expect(userController.setName({ db: db, id: new ObjectId(), newName: newName })).rejects.toThrowError();
  // });

  // test("set name with already existing name", async () => {
  //   expect.assertions(1);

  //   await userController.create({ db: db, userName: name });
  //   userHelper = await userController.get({ db: db, userName: name  });

  //   expect(
  //     userController.setName({ db: db, id: user._id, newName: name })
  //   ).rejects.toThrowError();
  // });

  // test("delete user", async () => {
  //   expect.assertions(2);

  //   await expect(userController.delete({ db: db, id: user._id })).resolves.toBeUndefined();
  //   await expect(userController.get({ db: db, userName: newName })).rejects.toThrowError();
  // });

  // test("delete user not found", () => {
  //   expect.assertions(1);

  //   expect(
  //     userController.delete({ db: db, id: user._id })
  //   ).rejects.toThrowError();
  // });

  // afterAll(() => {
  //   userController.delete({ db: db, id: userHelper._id }).catch(() => {});
  //   userController.delete({ db: db, id: user._id }).catch(() => {});
  // });
});
