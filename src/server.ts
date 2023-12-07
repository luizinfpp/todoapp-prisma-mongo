import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connect, setRepos } from "./adapters/controllers/db";
import userRoutes from "./main/routes/user";
import listRoutes from "./main/routes/list";
import * as dotenv from "dotenv";
import { DbInstanceMongo } from "./external/implementations/db";
import { UserMongoRepository } from "./external/implementations/user";
import { ListMongoRepository } from "./external/implementations/lists";

const bodyParser = require('body-parser')

dotenv.config();
const app = express();

const { MONGO_HOST, MONGO_PORT, MONGO_DBNAME, PORT } = process.env;

app.use(cors());
app.use(helmet());

let connectionString = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
const dbRepo = new DbInstanceMongo();

connect(connectionString, dbRepo).catch(() => {
  console.log("Error on connecting database");
});

let userRepo = new UserMongoRepository();
let listRepo = new ListMongoRepository();

setRepos(userRepo, listRepo);

app.use(bodyParser.json()) 

app.use("/user", userRoutes);

app.use("/list", listRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ status: "Api Running!!" });
});

app.listen(PORT, () => {
  console.log(`Todo-app listening on port ${PORT}`)
})
