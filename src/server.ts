import express from "express"
import cors from "cors"
import helmet from "helmet"
import { connectToDb, getDb } from "./db"
import { Db, ObjectId, WithId } from "mongodb"
import { z } from "zod"
import * as dotenv from 'dotenv'

dotenv.config()
const app = express()

const { MONGO_HOST, MONGO_PORT, MONGO_DBNAME } = process.env

app.use(cors())
app.use(helmet())

let db : Db

const Error = z.object({
  error: z.string(),
});

type Error = z.infer<typeof Error>;

const ListItem = z.object({
  _id: z.string().refine((val) => ObjectId.isValid(val)),
  name: z.string(),
  checked: z.boolean(),
});

type ListItem = z.infer<typeof ListItem>

const User = z.object({
  name: z.string(),
});

type User = z.infer<typeof User>;
type UserWithId = WithId<User>;

const List = z.object({
  _id: z.string().refine((val) => ObjectId.isValid(val)),
  name: z.string(),
  user: User,
  items: z.array(ListItem)
});

type List = z.infer<typeof List>;

let connectionStr = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`

connectToDb(connectionStr, (err) => {
  if(!err){
    app.listen(process.env.PORT, () => console.log('Listening!!'))
    db = getDb();
  }
});

// routes
app.get('/lists', (req, res) => {
  
  let lists: List[] = []

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
})

app.get('/users', async (req: express.Request, res: express.Response<UserWithId[] | Error>) => {
  
  const result = await db.collection<User>('users').find()
  result.toArray()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch users'})
    })
})

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