import { describe, test, expect, vi } from "vitest";
import { User } from "../entities/objects";
import { IUserRepository } from "../adapters/controllers/repositories/user";
import { createNewUser, deleteUser, getUser, getAllUsers, changeUserName } from "./user";

//const isDev = process.env.VITE_NODE_ENV === "dev";
const isDev = true;

describe.skipIf(!isDev)("user controller unit tests", () => {
  /***Mocks */
  let mockDb: object = {};

  class mockUserRepoSuccess implements IUserRepository {
    create = vi.fn().mockResolvedValue("user name");
    delete = vi.fn(() => Promise.resolve());
    exists = vi.fn().mockResolvedValue(false);
    get = vi.fn().mockResolvedValue(new User("test"));
    getAll = vi.fn().mockResolvedValue([new User("test"), new User("friend")]);
    setName = vi.fn(() => Promise.resolve());
  }

  class mockUserRepoFail implements IUserRepository {
    create = vi.fn().mockResolvedValue(false);
    delete = vi.fn(() => Promise.reject());
    exists = vi.fn().mockResolvedValue(false);
    get = vi.fn(() => Promise.reject());
    getAll = vi.fn(() => Promise.reject());
    setName = vi.fn(() => Promise.reject());
  }

  class mockUserRepoReject implements IUserRepository {
    create = vi.fn().mockRejectedValue("");
    delete = vi.fn().mockRejectedValue("");
    //delete = vi.fn(() => Promise.reject());
    exists = vi.fn().mockRejectedValue("");
    get = vi.fn().mockRejectedValue("");
    getAll = vi.fn().mockRejectedValue("");
    setName = vi.fn().mockRejectedValue("");
  }

  class mockUserRepoError implements IUserRepository {
    create = () => { throw new Error("Error on create") };
    delete = vi.fn(() => { throw new Error("Error on delete") });
    exists = () => { throw new Error("Error on exists") };
    get = vi.fn(() => { throw new Error("Error on get") });
    getAll = vi.fn(() => { throw new Error("Error on getall") });
    setName = vi.fn(() => { throw new Error("Error on setname") });
  }

  const userRepoSuccess = new mockUserRepoSuccess();
  const userRepoFail = new mockUserRepoFail();
  const userRepoReject = new mockUserRepoReject();
  const userRepoError = new mockUserRepoError();

  /***Declarations */
  const name = "test name";
  const newName = "new test name ";

  let user = new User(name);

  /***Tests */

  test("create user on db", async () => {
    expect(createNewUser(mockDb, userRepoSuccess, user)).resolves;
  });

  test("create user on db - failed attempt", async () => {
    expect(createNewUser(mockDb, userRepoFail, user)).rejects.toThrowError();
  });

  // test("create user on db - rejected attempt", async () => {
  //    expect(await createNewUser(mockDb, userRepoReject, user)).rejects.toThrowError();
  // });

  test("create user on db - error thrown", async () => {
    expect(createNewUser(mockDb, userRepoError, user)).rejects.toThrowError();
  });

  // test("delete user on db", async () => {
  //   let result = await deleteUser(mockDb, userRepoSuccess, user);
  //   expect(result).toHaveReturned();
  // });

  // test("delete user on db - fail", async () => {
  //   let result = await deleteUser(mockDb, userRepoFail, user);
  //   expect(result).toHaveReturned();
  // });

  // test("delete user on db - wrong name", async () => {
  //   let result = await deleteUser(mockDb, userRepoError, user);
  //   expect(result).toHaveReturned();
  // });

  // test("get all users", async () => {
  //   let result = await getAllUsers(mockDb, userRepoSuccess);

  //   expect(result).toHaveReturned();
  //   expect(result).toBeInstanceOf(Array<User>);
  // });

  // test("get all users - fail", async () => {
  //   let result = await getAllUsers(mockDb, userRepoFail);

  //   expect(result).toThrowError();
  // });

  // test("get all users - error", async () => {
  //   let result = await getAllUsers(mockDb, userRepoError);

  //   expect(result).toThrowError();
  // });

  // test("get user by username", async () => {
  //   let result = await getUser(mockDb, userRepoSuccess, name);

  //   expect(result).toHaveReturned();
  //   expect(result).toBeInstanceOf(User);
  //   expect(result.name).toEqual(name);
  // });

  // test("get user by username - fail", async () => {
  //   let result = await getUser(mockDb, userRepoFail, name);

  //   expect(result).toThrowError();
  // });

  // test("get user by username - name not found", async () => {
  //   let result = await getUser(mockDb, userRepoError, name);

  //   expect(result).toThrowError();
  // });

  // test("change user name", async () => {
  //   let result = await changeUserName(mockDb, userRepoSuccess, user, newName);

  //   expect(result).toHaveReturned();
  // });

  // test("change user name - fail", async () => {
  //   let result = await changeUserName(mockDb, userRepoFail, user, newName);

  //   expect(result).toHaveReturned();
  // });

  // test("change user name - user does not exist", async () => {
  //   let result = await changeUserName(mockDb, userRepoError, user, name);

  //   expect(result).toThrowError();
  // });

  
});
