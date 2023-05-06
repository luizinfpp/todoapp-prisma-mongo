import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectToDb } from "./db";
import userRoutes from "./routes/user";
import { Db } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

const { MONGO_HOST, MONGO_PORT, MONGO_DBNAME } = process.env;

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

// routes
app.get("/lists", (req, res) => {
  //let lists: List[] = []
  // db.collection('lists')
  //   .find()
  //   //.sort({author: 1})
  //   //.skip(page * booksPerPage)
  //   //.limit(booksPerPage)
  //   .forEach(list => lists.push(list))
  //   .then(() => {
  //     res.status(200).json(lists)
  //   })
  //   .catch(() => {
  //     res.status(500).json({error: 'Could not fetch lists'})
  //   })
});

// app.get('/books/:id', (req, res) => {

//   if (ObjectId.isValid(req.params.id)) {

//     db.collection('books')
//       .findOne({_id: new ObjectId(req.params.id)})
//       .then(doc => {
//         res.status(200).json(doc)
//       })
//       .catch(err => {
//         res.status(500).json({error: 'Could not fetch the document'})
//       })

//   } else {
//     res.status(500).json({error: 'Could not fetch the document'})
//   }

// })

// app.post('/books', (req, res) => {
//   const book = req.body

//   db.collection('books')
//     .insertOne(book)
//     .then(result => {
//       res.status(201).json(result)
//     })
//     .catch(err => {
//       res.status(500).json({err: 'Could not create new document'})
//     })
// })

// app.delete('/books/:id', (req, res) => {

//   if (ObjectId.isValid(req.params.id)) {

//   db.collection('books')
//     .deleteOne({ _id: new ObjectId(req.params.id) })
//     .then(result => {
//       res.status(200).json(result)
//     })
//     .catch(err => {
//       res.status(500).json({error: 'Could not delete document'})
//     })

//   } else {
//     res.status(500).json({error: 'Could not delete document'})
//   }
// })

// app.patch('/books/:id', (req, res) => {
//   const updates = req.body

//   if (ObjectId.isValid(req.params.id)) {

//     db.collection('books')
//       .updateOne({ _id: new ObjectId(req.params.id) }, {$set: updates})
//       .then(result => {
//         res.status(200).json(result)
//       })
//       .catch(err => {
//         res.status(500).json({error: 'Could not update document'})
//       })

//   } else {
//     res.status(500).json({error: 'Could not update document'})
//   }
// })
