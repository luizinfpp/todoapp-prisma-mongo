import { User, List, ListItem } from "../../entities/objects";
import { getDb, getListRepo } from "./db";
import { dbObject } from "./repositories/db";
import { IListRepository } from "./repositories/list";

export class ListController {

  createListOnDB = async (list: List): Promise<string> => {
    const db : dbObject = await getDb();
    const listRepo : IListRepository = await getListRepo();

    return await listRepo.create(db, list);
  }

  deleteListOfDb = async (list: List): Promise<void> => {
    const db : dbObject = await getDb();
    const listRepo : IListRepository = await getListRepo();

    return await listRepo.delete(db, list);
  }

  existsOnDb = async (name: string, user: User): Promise<boolean> => {
    const db : dbObject = await getDb();
    let listRepo : IListRepository = await getListRepo();

    return await listRepo.exists(db, name, user);
  }; 

  getAllListsFromUserOnDb = async (user: User): Promise<List[]> => {
    const db : dbObject = await getDb();
    const listRepo : IListRepository = await getListRepo();
    
    return await listRepo.getAll(db, user);
  }; 

  getListFromDb = async (name: string, user: User): Promise<List> => {
    const db : dbObject = await getDb();
    let listRepo : IListRepository = await getListRepo();

    return await listRepo.get(db, name, user);
  }; 

  setListNameOnDb = async (list: List, newName: string): Promise<void> => {
    const db : dbObject = await getDb();
    const listRepo : IListRepository = await getListRepo();
    
    return await listRepo.setName(db, list, newName);
  };

  addListItemToListOnDb = async (list: List, listItem: ListItem): Promise<void> => {
    const db : dbObject = await getDb();
    const listRepo : IListRepository = await getListRepo();
    
    return await listRepo.addItem(db, list, listItem);
  }; 

  fetchAllItemsOfListOnDb = async (list: List): Promise<ListItem[]> => {
    const db : dbObject = await getDb();
    const listRepo : IListRepository = await getListRepo();
    
    return await listRepo.fetchAllItems(db, list);
  };

  removeItemFromListOnDb = async (list: List, listItem: ListItem): Promise<void> => {
    const db : dbObject = await getDb();
    const listRepo : IListRepository = await getListRepo();

    return await listRepo.removeItem(db, list, listItem);
  }
}
