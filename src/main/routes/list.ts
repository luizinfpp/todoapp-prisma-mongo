import express from "express";
import { List, ListItem, User } from "../../entities/objects";
import {
  createNewList,
  deleteList,
  getList,
  getAllListsFromUser,
  changeListName,
  addItemToList,
  removeItemFromList,
  fetchItemsFromList,
} from "../../usecases/list";

const router = express.Router();

// login route
router.post("/", async (req, res) => {
  let { name, userName } = req.body;
  //TODO: error handling at this level
  const user = new User(userName);
  const list = new List(name, user);

  createNewList(list, user)
    .then(() => {
      res.status(200);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not create list" });
    });
});

router.get("/", async (req, res) => {
  let { name, userName } = req.body;
  //TODO: error handling at this level
  const user = new User(userName);

  getList(name, user)
    .then(() => {
      res.status(200);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch user" });
    });
});

router.get("/all", async (req, res) => {
  let { userName } = req.body;
  //TODO: error handling at this level
  const user = new User(userName);

  getAllListsFromUser(user)
    .then(() => {
      res.status(200);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch users" });
    });
});

router.put("/", async (req, res) => {
  let { list, newName } = req.body;

  changeListName(list, newName)
    .then(() => {
      res.status(200);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not update user" });
    });
});

router.delete("/", async (req, res) => {
  let { list } = req.body;

  deleteList(list)
    .then(() => {
      res.status(200);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not delete user" });
    });
});

export default router;
