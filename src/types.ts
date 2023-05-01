import { z } from "zod"
import { ObjectId, WithId } from "mongodb"

const Error = z.object({
  error: z.string(),
});

type Error = z.infer<typeof Error>;

type WithError<T> = T | Error;

const ListItem = z.object({
  _id: z.string().refine((val) => ObjectId.isValid(val)),
  name: z.string(),
  checked: z.boolean(),
});

type ListItem = z.infer<typeof ListItem>
type ListItemWithId = WithId<ListItem>;

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
type ListWithId = WithId<List>;

export { Error, WithError, User, UserWithId, ListWithId, ListItemWithId }