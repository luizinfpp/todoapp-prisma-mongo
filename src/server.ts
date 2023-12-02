import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connect } from "./adapters/controllers/db";
import userRoutes from "./main/routes/user";
import listRoutes from "./main/routes/list";
import * as dotenv from "dotenv";
import { DbInstanceMongo } from "./external/implementations/db";
import { UserMongoRepository } from "./external/implementations/user";

dotenv.config();
const app = express();

const { MONGO_HOST, MONGO_PORT, MONGO_DBNAME, PORT } = process.env;

app.use(cors());
app.use(helmet());

let connectionString = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
const dbRepo = new DbInstanceMongo();

await connect(connectionString, dbRepo);

let userRepo = new UserMongoRepository();

const addRepoMiddleware = (repo) => {
  return (req, res, next) => {
    req.body.repo = repo;
    next();
  }
}

app.use("/user", addRepoMiddleware(userRepo), userRoutes);

app.use("/list", listRoutes);

app.listen(PORT, () => {
  console.log(`Todo-app listening on port ${PORT}`)
})
