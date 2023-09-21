import { z } from "zod"
import { ObjectId, WithId } from "mongodb"

// type ListItemMongo = WithId<ListItem>;

// type UserMongo = WithId<User>;

const ListMongoImplementation = z.object({
  name: z.string(),
  user: z.instanceof(ObjectId),
  items: z.instanceof(Array<ObjectId>)
});

type ListMongoImplementation = z.infer<typeof ListMongoImplementation>;
type ListMongo = WithId<ListMongoImplementation>;

export { ListMongo }