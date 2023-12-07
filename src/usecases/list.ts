import { ListController } from "../adapters/controllers/lists"
import { User, List, ListItem } from "../entities/objects";

export const createNewList = async (list: List, user: User) : Promise<void> => {
  const listController = new ListController();
  
  return new Promise<void>((resolve, reject) => {
    listController.existsOnDb(list.name, user).then((exists) => {
      if (exists) {
        reject(new Error("A similar list already exists on database."));
      } else {
        listController.createListOnDB(list).then((created) => {
          if (created) {
            console.log("List was created on database succesfully.");
          } else {
            reject(new Error("List was not created on database."));
          }
        });
      }
    });
  });
}

export const deleteList = async (list: List) : Promise<void> => {
  const listController = new ListController();
  await listController.deleteListOfDb(list);
};

export const getAllListsFromUser = async (user: User) : Promise<List[]> => {
  const listController = new ListController();

  return new Promise<List[]>(async (resolve, reject) => {
    const result = await listController.getAllListsFromUserOnDb(user);
    
    if(result)
      resolve(result);
    else
      reject(new Error("List search returned an error."));
  });
};

export const getList = async (name: string, user: User) : Promise<List> => {
  const listController = new ListController();

  return new Promise<List>(async (resolve, reject) => {
    const result = await listController.getListFromDb(name, user);
    
    if(result)
      resolve(result);
    else
      reject(new Error("List not found."));
  });

};

export const changeListName = async (list: List, newName: string) : Promise<void> => {
  const listController = new ListController();
  await listController.setListNameOnDb(list, newName);
};

export const addItemToList = async (list: List, item: ListItem) : Promise<void> => {
  const listController = new ListController();
  await listController.addListItemToListOnDb(list, item);
}

export const removeItemFromList = async (list: List, item: ListItem) : Promise<void> => {
  const listController = new ListController();
  await listController.removeItemFromListOnDb(list, item);
}

export const fetchItemsFromList = async (list: List) : Promise<ListItem[]> => {
  const listController = new ListController();
  let result = await listController.fetchAllItemsOfListOnDb(list);
  return result;
}