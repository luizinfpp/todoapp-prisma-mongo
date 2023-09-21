import { WithError } from "../../../entities/types";

type dbObject = object;

interface DbInstanceRepository{
  connect(connectionString: string): WithError<dbObject>;
}

export { DbInstanceRepository, dbObject }