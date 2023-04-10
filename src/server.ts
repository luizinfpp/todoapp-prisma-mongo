import express from "express"
import cors from "cors"
import helmet from "helmet"

const app = express()

app.use(cors())
app.use(helmet())

app.listen(8007, () => { console.log("Listening!!!") })