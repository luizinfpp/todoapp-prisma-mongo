import { Error } from "./objects"
import { z } from "zod"

type Error = z.infer<typeof Error>;

type WithError<T> = T | Error;

// type User = z.infer<typeof User>;

// type List = z.infer<typeof List>;

// type ListItem = z.infer<typeof ListItem>

export { Error, WithError }