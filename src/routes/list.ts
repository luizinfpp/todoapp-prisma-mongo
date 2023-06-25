import { ListController } from "../controllers/lists";
import express from "express";
import { dbConnection } from "../db";
import { ListWithId, WithError } from "../types";

const router = express.Router();

const list = new ListController();

router.get("/", (req: express.Request, res: express.Response<WithError<ListWithId[]>>) => {

  list.getAll({ db: dbConnection })
    .then((lists) => {
      res.status(200).json(lists);
    }).catch(() => {
      res.status(500).json({ error: "Could not fetch lists" });
    })

});



export default router;