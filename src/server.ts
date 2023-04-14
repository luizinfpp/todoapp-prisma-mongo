import express from "express"
import cors from "cors"
import helmet from "helmet"
import { connectToDb, getDb } from "./db"
import { Db, ObjectId } from "mongodb"
import { z } from "zod"

const app = express()

app.use(cors())
app.use(helmet())

let db : Db

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

const List = z.object({
  _id: z.string().refine((val) => ObjectId.isValid(val)),
  name: z.string(),
  user: User,
  items: z.array(ListItem)
});

type List = z.infer<typeof List>;

connectToDb('mongodb://127.0.0.1:27017/todo-app', (err) => {
  if(!err){
    app.listen(8007, () => console.log('Listening!!'))
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

app.get('/users', (req, res) => {
  
  let users : User[] = [] 

  // db.collection<User>('users')
  //   .find()
  //   //.sort({author: 1})
  //   //.skip(page * booksPerPage)
  //   //.limit(booksPerPage)
  //   .forEach(user => users.push(user))
  //   .then(() => {
  //     res.status(200).json(users)
  //   })
  //   .catch(() => {
  //     res.status(500).json({error: 'Could not fetch users'})
  //   })
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