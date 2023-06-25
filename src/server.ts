import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectToDb } from "./db";
import userRoutes from "./routes/user";
import listRoutes from "./routes/list";
import { Db } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

const { MONGO_HOST, MONGO_PORT, MONGO_DBNAME, PORT } = process.env;

app.use(cors());
app.use(helmet());

let db: Db;

let connectionStr = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;

connectToDb(connectionStr)
  .then((dbConn) => {
    db = dbConn;
  })
  .catch((err) => {
    throw new Error(err);
  });

app.use("/user", userRoutes);

app.use("/list", listRoutes);

app.listen(PORT, () => {
  console.log(`Todo-app listening on port ${PORT}`)
})
