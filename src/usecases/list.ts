import { ListController } from "../adapters/controllers/lists"
import { User, List, ListItem } from "../entities/objects";

export const createNewList = async (list: List) : Promise<void> => {
  const listController = new ListController();
  
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