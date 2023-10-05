import { dbObject } from "../adapters/controllers/repositories/db";
import { IUserRepository } from "../adapters/controllers/repositories/user";
import { UserController } from "../adapters/controllers/users";
import { User } from "../entities/objects";

export const createNewUser = async (db:dbObject, repo: IUserRepository, user: User) : Promise<void> => {
  const userController = new UserController(db, repo);
  
  await userController.existsOnDb(user.name).then((exists) => {
    if (exists) {
      throw new Error("User already exists on database.");
    } else {
      userController.createUserOnDB(user).then((created) => {
        if (created) {
          console.log("User was created on database succesfully.");
        } else {
          throw new Error("User was not created on database.");
        }
      });
    }
  });
}

export const deleteUser = async (db:dbObject, repo: IUserRepository, user: User) : Promise<void> => {
  const userController = new UserController(db, repo);
  await userController.deleteOfDb(user);
};

export const getAllUsers = async (db:dbObject, repo: IUserRepository) : Promise<User[]> => {
  const userController = new UserController(db, repo);
  const result = await userController.getAllUsersFromDb();

  if(result)
    return result;
  else
    throw new Error("User search returned an error.");
};

export const getUser = async (db:dbObject, repo: IUserRepository, name: string) : Promise<User> => {
  const userController = new UserController(db, repo);
  const result = await userController.getUserFromDb(name);

  if(result)
    return result;
  else
    throw new Error("User not found.");
};

export const changeUserName = async (  ) : Promise<void> => {
  
};
