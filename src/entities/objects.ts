import { z } from "zod"

const Error = z.object({
  error: z.string(),
});

class ListItem {
  text: string;
  checked: boolean;
}

class List {
  name: string;
  user: User;
  items: ListItem[];

  constructor(name: string, user: User){
    this.name = name;
    this.user = user;
    this.items = [];
  }
}

class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

/**Using zod object to biuld class */

// const User = z.object({
//   name: z.string(),
// });

// interface IUser extends z.infer<typeof User>{

// }

// class UserClass implements IUser {
  
// }

export { Error, User, List, ListItem }