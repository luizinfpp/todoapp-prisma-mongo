import express from "express";
import { User } from "../../entities/objects";
import { createNewUser, deleteUser, getUser, getAllUsers, changeUserName } from "../../usecases/user";

const router = express.Router();

// login route
router.post("/", async (req, res) => {
  let { name } = req.body;
  const user = new User(name);

  createNewUser(user)
    .then(() => {
      res.status(200);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not create user" });
    });
});

router.get("/", async (req, res) => {
  let name : string = req.body.name;

  getUser(name)
    .then(() => {
      res.status(200);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch user" });
    });
});

router.get("/all", async (req, res) => {

  getAllUsers()
    .then(() => {
      res.status(200);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch users" });
    });
});

router.put("/", async (req, res) => {
  let { name, newName } = req.body;

  const user = new User(name);

  changeUserName(user, newName)
    .then(() => {
      res.status(200);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not update user" });
    });
});

router.delete("/", async (req, res) => {
  let { name } = req.body;

  const user = new User(name);

  deleteUser(user)
    .then(() => {
      res.status(200);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not delete user" });
    });
});

export default router;
