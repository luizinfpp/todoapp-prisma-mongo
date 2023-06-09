import { UserController } from "../controllers/users";
import express from "express";
import { UserWithId, WithError } from "../types";
import { dbConnection } from "../db";

const router = express.Router();

const user = new UserController();

interface GetUserRequest extends express.Request {
  body: { name: string };
}

// login route
router.post("/login",async (req: GetUserRequest, res: express.Response<WithError<UserWithId>>) => {
    
    // db = getDb();
    // let { name } = req.body;

    // user.getUser(db, name)
    //   .then((user) => {
    //     res.status(200).json(user);
    //   })
    //   .catch(() => {
    //     res.status(500).json({ error: "Could not fetch users" });
    //   });
  }
);

router.get("/", (req: express.Request, res: express.Response<WithError<UserWithId[]>>) => {

  user.getAll({ db: dbConnection })
    .then((users) => {
      res.status(200).json(users);
    }).catch(() => {
      res.status(500).json({ error: "Could not fetch users" });
    })

});



export default router;
