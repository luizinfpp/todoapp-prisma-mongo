import { IUserRepository } from "../../adapters/controllers/repositories/user";
import express from "express";
import { User } from "../../entities/objects";
import { createNewUser, deleteUser, getUser, getAllUsers, changeUserName } from "../../usecases/user";
import { getDb } from "../../adapters/controllers/db";

const router = express.Router();


interface GetUserRequest extends express.Request {
  body: { repo: IUserRepository; name: string };
}
interface GetAllUsersRequest extends express.Request {
  body: { repo: IUserRepository};
}
interface PutUserRequest extends express.Request {
  body: { repo: IUserRepository; name: string; newName: string };
}

const db = getDb();

// login route
router.post("/", async (req: GetUserRequest, res) => {
  let { repo, name } = req.body;
  const user = new User(name);

  createNewUser(db, repo, user)
    .then(() => {
      res.status(200);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not create user" });
    });
});

router.get("/", async (req: GetUserRequest, res) => {
  let { repo, name } = req.body;

  getUser(db, repo, name)
    .then(() => {
      res.status(200);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch user" });
    });
});

router.get("/", async (req: GetUserRequest, res) => {
  let { repo } = req.body;

  getAllUsers(db, repo)
    .then(() => {
      res.status(200);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch users" });
    });
});

router.put("/", async (req: PutUserRequest, res) => {
  let { repo, name, newName } = req.body;

  const user = new User(name);

  changeUserName(db, repo, user, newName)
    .then(() => {
      res.status(200);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not update user" });
    });
});

router.delete("/", async (req: GetUserRequest, res) => {
  let { repo, name } = req.body;

  const user = new User(name);

  deleteUser(db, repo, user)
    .then(() => {
      res.status(200);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not delete user" });
    });
});

export default router;
