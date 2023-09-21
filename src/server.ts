import express from "express";
import cors from "cors";
import helmet from "helmet";
import { DbInstance } from "./adapters/controllers/db";
import userRoutes from "./main/routes/user";
import listRoutes from "./main/routes/list";
import * as dotenv from "dotenv";
import { dbObject } from "./adapters/controllers/repositories/db";
import { DbInstanceMongo } from "./external/implementations/db";

dotenv.config();
const app = express();

const { MONGO_HOST, MONGO_PORT, MONGO_DBNAME, PORT } = process.env;

app.use(cors());
app.use(helmet());

let db: dbObject;
let connectionString = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
const dbRepo = new DbInstanceMongo();
const dbInstance = new DbInstance(dbRepo);

db = dbInstance.connect(connectionString);

app.use("/user", userRoutes);

app.use("/list", listRoutes);

app.listen(PORT, () => {
  console.log(`Todo-app listening on port ${PORT}`)
})
