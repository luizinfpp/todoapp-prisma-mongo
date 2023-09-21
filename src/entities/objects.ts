import { z } from "zod"
//import { ObjectId, WithId } from "mongodb"

const Error = z.object({
  error: z.string(),
});

const ListItem = z.object({
  text: z.string(),
  checked: z.boolean(),
});

//type ListItemWithId = WithId<ListItem>;

const User = z.object({
  name: z.string(),
});

//type UserWithId = WithId<User>;

const List = z.object({
  name: z.string(),
  user: z.string(),
  items: z.array(z.string())
  //user: z.instanceof(ObjectId),
  //items: z.instanceof(Array<ObjectId>)
});

//type ListWithId = WithId<List>;

export { Error, User, List, ListItem }