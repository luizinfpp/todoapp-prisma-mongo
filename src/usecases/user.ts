import { UserController } from "../adapters/controllers/users";
import { User } from "../entities/objects";

export const createNewUser = async (user: User) : Promise<void> => {
  const userController = new UserController();
  
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

export const deleteUser = async (user: User) : Promise<void> => {
  const userController = new UserController();
  await userController.deleteOfDb(user);
};

export const getAllUsers = async () : Promise<User[]> => {
  const userController = new UserController();

  return new Promise<User[]>(async (resolve, reject) => {
    const result = await userController.getAllUsersFromDb();
    
    if(result)
      resolve(result);
    else
      reject(new Error("User search returned an error."));
  });
};

export const getUser = async (name: string) : Promise<User> => {
  const userController = new UserController();

  return new Promise<User>(async (resolve, reject) => {
    const result = await userController.getUserFromDb(name);
    
    if(result)
      resolve(result);
    else
      reject(new Error("User not found."));
  });

};

export const changeUserName = async (user: User, newName: string) : Promise<void> => {
  const userController = new UserController();
  await userController.setUserNameOnDb(user, newName);
};
