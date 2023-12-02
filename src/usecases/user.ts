import { dbObject } from "../adapters/controllers/repositories/db";
import { IUserRepository } from "../adapters/controllers/repositories/user";
import { UserController } from "../adapters/controllers/users";
import { User } from "../entities/objects";

export const createNewUser = async (db:dbObject, repo: IUserRepository, user: User) : Promise<void> => {
  const userController = new UserController(db, repo);
  
  return new Promise<void>((resolve, reject) => {
    userController.existsOnDb(user.name).then((exists) => {
      if (exists) {
        reject(new Error("User already exists on database."));
      } else {
        userController.createUserOnDB(user).then((created) => {
          if (created) {
            console.log("User was created on database succesfully.");
          } else {
            reject(new Error("User was not created on database."));
          }
        });
      }
    });
  });

  
}

export const deleteUser = async (db:dbObject, repo: IUserRepository, user: User) : Promise<void> => {
  const userController = new UserController(db, repo);
  await userController.deleteOfDb(user);
};

export const getAllUsers = async (db:dbObject, repo: IUserRepository) : Promise<User[]> => {
  const userController = new UserController(db, repo);

  return new Promise<User[]>(async (resolve, reject) => {
    const result = await userController.getAllUsersFromDb();
    
    if(result)
      resolve(result);
    else
      reject(new Error("User search returned an error."));
  });
};

export const getUser = async (db:dbObject, repo: IUserRepository, name: string) : Promise<User> => {
  const userController = new UserController(db, repo);

  return new Promise<User>(async (resolve, reject) => {
    const result = await userController.getUserFromDb(name);
    
    if(result)
      resolve(result);
    else
      reject(new Error("User not found."));
  });

};

export const changeUserName = async (db:dbObject, repo: IUserRepository, user: User, newName: string) : Promise<void> => {
  const userController = new UserController(db, repo);
  await userController.setUserNameOnDb(user, newName);
};
