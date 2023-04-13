import express from "express"
import cors from "cors"
import helmet from "helmet"
//import { connectToDb } from "./db"

const app = express()

app.use(cors())
app.use(helmet())

//connectToDb('mongodb://127.0.0.1:27017/todo-app');

app.listen(8007, () => { console.log(`Listening!!!`) })